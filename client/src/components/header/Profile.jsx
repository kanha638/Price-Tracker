import React, { useState } from "react";
import { Button, Modal, TextField, Box, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { getProfilePicImageURL } from "../../utils/utilities";
import { uploadProfilePicture } from "../../middleware/user";

export const Profile = ({ handleClose }) => {
  const user = useSelector(selectUser);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  console.log(user);

  const profilePicChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
  };

  const uploadPicture = async () => {
    await uploadProfilePicture(file, dispatch, setFile, user?.id);
  };

  return (
    <form>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marign="auto"
        padding={2}
        borderRadius={2}
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "white",
          minWidth: "300px",

          maxWidth: "550px",
          width: "90%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div
          style={{
            width: "90%",
          }}
        >
          <Button onClick={handleClose}>
            <i
              class="fa-solid fa-arrow-left"
              style={{
                fontSize: "25px",
                color: "black",
              }}
            ></i>
          </Button>
        </div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          id="profile_img"
          onChange={profilePicChangeHandler}
          style={{ display: "none" }}
        />
        <label htmlFor="profile_img">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user?.profile_pic || file ? (
              <img
                alt="logo"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : getProfilePicImageURL(user?.profile_pic)
                }
                style={{
                  height: "8rem",
                  width: "8rem",
                  borderRadius: "50%",
                  border: "2px solid black",
                  boxSizing: "border-box",
                }}
              />
            ) : (
              <span
                style={{
                  height: "8rem",
                  width: "8rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "solid 2px black",
                  borderRadius: "50%",
                }}
              >
                <i
                  className="fa fa-user icon"
                  style={{
                    cursor: "pointer",
                    fontSize: "60px",
                  }}
                ></i>
              </span>
            )}
          </div>
        </label>
        {file && (
          <div style={{ display: "flex", gap: "10px" }}>
            <span
              style={{
                marginTop: "10px",
                backgroundColor: "red",
                cursor: "pointer",
                padding: "2px 10px",
                borderRadius: "10px",
                color: "white",
              }}
              onClick={() => {
                setFile(null);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
            <span
              style={{
                marginTop: "10px",
                backgroundColor: "green",
                cursor: "pointer",
                padding: "2px 10px",
                borderRadius: "10px",
                color: "white",
              }}
              onClick={uploadPicture}
            >
              <i className="fa-solid fa-check"></i>
            </span>
          </div>
        )}

        <Typography
          variant="h4"
          style={{ fontSize: "38px", marginTop: "20px" }}
          padding={0}
          textAlign="center"
        ></Typography>
        <TextField
          variant={"outlined"}
          margin="normal"
          type={"text"}
          autoComplete="name"
          name="credential"
          value={user?.name}
          sx={{ width: "90%" }}
        />
        <TextField
          variant={"outlined"}
          margin="normal"
          value={user?.email}
          type={"text"}
          autoComplete="email"
          name="credential"
          sx={{ width: "90%" }}
        />
        <TextField
          variant={"outlined"}
          value={user?.mobileNum}
          type={"number"}
          margin="normal"
          name="password"
          sx={{ width: "90%" }}
        />
        <TextField
          variant={"outlined"}
          type={"password"}
          placeholder={"Enter your current password"}
          margin="normal"
          name="password"
          sx={{ width: "90%" }}
        />

        <Button
          sx={{
            marginTop: 3,
            width: "90%",
            height: "50px",
          }}
          style={{
            borderRadius: 3,
            backgroundColor: "black",
            padding: "10px 10px",
            fontSize: "20px",
          }}
          variant="contained"
          type="submit"
        >
          Save
        </Button>
        <Grid container>
          <Grid
            item
            sx={{
              display: "flex",
              width: "100%",
              marginTop: "20px",
              justifyContent: "space-between",
            }}
          >
            <p>Want to reset the password?</p>
            <p
              to="/" //link of reset password page here
              className="link-redirect"
            >
              Reset Password
            </p>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
