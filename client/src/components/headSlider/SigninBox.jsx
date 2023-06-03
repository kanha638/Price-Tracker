import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import logo_pt from "../../assets/images/favicon.jpeg";
import { TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../slices/userSlice";
import { GoogleAuth } from "../../middleware/auth";
import { secrets } from "../../environment/config";

export const SigninBox = ({
  submitHandler,
  handleClose,
  details,
  changeHandler,
  errors,
}) => {
  const userState = useSelector(UserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleCallbackResponse(response) {
    await GoogleAuth(response.credential, dispatch, navigate, handleClose);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: secrets?.google_auth_client,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      type: "icon",
      shape: "rectangle",
      theme: "filled_black",
      text: "continue with",
      width: "240px",
    });
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marign="auto"
        // marginTop={5}
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
          top: "45%",
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
          <span
            to="/"
            className="link-redirect"
            style={{ color: "black", cursor: "pointer" }}
            onClick={handleClose}
          >
            <i class="fa-solid fa-arrow-left" style={{ fontSize: "25px" }}></i>
          </span>
        </div>
        <Link to="/">
          <img
            alt="logo"
            src={logo_pt}
            style={{
              height: "120px",
              width: "120px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </Link>
        <Typography
          variant="h4"
          style={{ fontSize: "40px", marginTop: "20px" }}
          padding={0}
          textAlign="center"
        >
          Login
        </Typography>

        <TextField
          variant={"outlined"}
          margin="normal"
          placeholder="Email / mobile-number"
          type={"text"}
          autoComplete="email"
          name="credential"
          onChange={changeHandler}
          value={details.credential}
          sx={{ width: "90%" }}
          error={errors.credential}
          helperText={errors.credential && "Please enter you email/mobile."}
        />
        <TextField
          // id="outlined-password-input"
          variant={"outlined"}
          placeholder="Password"
          type={"password"}
          margin="normal"
          name="password"
          value={details.password}
          onChange={changeHandler}
          sx={{ width: "90%" }}
          error={errors.password}
          helperText={errors.password && "Please enter you password."}
        />
        <div style={{ width: "90%" }}>
          {userState?.isErrors === true && (
            <p style={{ marginTop: "30px", color: "red" }}>
              {userState?.errorMessage?.authForms}
            </p>
          )}

          <Button
            sx={{
              marginTop: 3,
              width: "100%",
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
            Login
          </Button>
          <Grid
            container
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Grid item>Sign in using social media ?</Grid>
            <Grid item sx={{ display: "flex" }}>
              <div id="signInDiv" style={{ marginTop: "5px" }}></div>
            </Grid>
          </Grid>
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
              <p>Don't have an account ?</p>
              <Link to="/sign-up" className="link-redirect">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </Box>
    </form>
  );
};
