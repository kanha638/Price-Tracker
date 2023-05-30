import React, { useState } from "react";
import { Button, TextField, Box, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { getProfilePicImageURL } from "../../utils/utilities";
import { uploadProfilePicture } from "../../middleware/user";
import { Modal } from "@mui/material";
import PasswordResetPage from "../../pages/EmailLink";
export const Profile = ({ handleClose }) => {
    const user = useSelector(selectUser);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    // console.log(user);

    const profilePicChangeHandler = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        console.log(URL.createObjectURL(e.target.files[0]));
    };

    const uploadPicture = async () => {
        await uploadProfilePicture(file, dispatch, setFile, user?.id);
    };

    const [details, setDetails] = useState({
        name: user.name,
        email: user.email,
        mobileNum: user.mobileNum,
        password: "",
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        mobileNum: false,
        password: false,
    });

    const changeHandler = (e) => {
        setErrors({ ...errors, [e.target.name]: false });
        setDetails({ ...details, [e.target.name]: e.target.value });
        console.log(details);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let { name, email, password, mobileNum } = {
            name: false,
            email: false,
            password: false,
            mobileNum: false,
        };
        if (details.name === "") name = true;
        if (details.email === "") email = true;
        if (details.mobileNum === "") mobileNum = true;
        if (details.password === "") password = true;

        setErrors({
            name: name,
            email: email,
            mobileNum: mobileNum,
            password: password,
        });

        if (
            details.name &&
            details.email &&
            details.mobileNum &&
            details.password
        ) {
            console.log("Profile can be updated");
        } else {
            return;
        }

        console.log(details);
    };
    
    return (
        <form onSubmit={submitHandler}>
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
                                        : getProfilePicImageURL(
                                              user?.profile_pic
                                          )
                                }
                                style={{
                                    height: "8rem",
                                    width: "8rem",
                                    borderRadius: "50%",
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
                                    "object-fit": "contain",
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
                    name="name"
                    error={errors.name}
                    helperText={errors.name === true && "Name is required"}
                    value={details.name}
                    onChange={changeHandler}
                    sx={{ width: "90%" }}
                />
                <TextField
                    variant={"outlined"}
                    margin="normal"
                    value={details.email}
                    type={"text"}
                    autoComplete="email"
                    name="email"
                    error={errors.email}
                    helperText={errors.email && "Email is required"}
                    onChange={changeHandler}
                    sx={{ width: "90%" }}
                />
                <TextField
                    variant={"outlined"}
                    value={details?.mobileNum}
                    type={"number"}
                    margin="normal"
                    name="mobileNum"
                    error={errors.mobileNum}
                    helperText={errors.mobileNum && "Mobile number is required"}
                    onChange={changeHandler}
                    sx={{ width: "90%" }}
                />
                <TextField
                    variant={"outlined"}
                    type={"password"}
                    placeholder={"Enter your current password"}
                    value={details.password}
                    margin="normal"
                    name="password"
                    error={errors.password}
                    helperText={
                        errors.password && "Please enter you current password."
                    }
                    onChange={changeHandler}
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
