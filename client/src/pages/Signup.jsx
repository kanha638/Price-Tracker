import React, { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import logo_pt from "../assets/images/favicon.jpeg";
import { GoogleAuth, signUp } from "../middleware/auth";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../slices/userSlice";
import { secrets } from "../environment/config";

const SignUp = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobileNum: "",
    password: "",
    confirmPassword: "",
  });
  const userState = useSelector(UserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    await GoogleAuth(response.credential, dispatch, navigate);
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

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    mobileNum: false,
    password: false,
    confirmPassword: false,
  });

  function changeHandler(e) {
    switch (e.target.name) {
      case "name":
        setErrors({ ...errors, name: false });
        break;
      case "email":
        setErrors({ ...errors, email: false });
        break;
      case "mobileNum":
        setErrors({ ...errors, mobileNum: false });
        break;
      case "password":
        setErrors({ ...errors, password: false });
        break;
      case "confirmPassword":
        setErrors({ ...errors, confirmPassword: false });
        break;
      default:
        break;
    }
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(details);

    let { name, email, password, confirmPassword, mobileNum } = {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
      mobileNum: false,
    };
    if (details.name === "") name = true;
    if (details.email === "") email = true;
    if (details.confirmPassword === "") confirmPassword = true;
    if (details.mobileNum === "") mobileNum = true;
    if (details.password === "") password = true;

    setErrors({
      name: name,
      email: email,
      mobileNum: mobileNum,
      password: password,
      confirmPassword: confirmPassword,
    });

    console.log(errors);

    if (
      details.name &&
      details.email &&
      details.confirmPassword &&
      details.mobileNum &&
      details.password
    ) {
      await signUp(details, dispatch, navigate);
    } else {
      return;
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#f8f4f3",
        minHeight: "120vh",
        position: "relative",
        margin: "0px",
        padding: "0px",
        paddingBottom: "100px",
      }}
    >
      <form onSubmit={submitHandler}>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          marign="auto"
          marginTop={5}
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
            paddingBottom: "50px",
          }}
        >
          <div
            style={{
              width: "90%",
            }}
          >
            <Link to="/" className="link-redirect" style={{ color: "black" }}>
              <i
                class="fa-solid fa-arrow-left"
                style={{ fontSize: "25px" }}
              ></i>
            </Link>
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
            Sign-Up
          </Typography>
          <TextField
            margin="normal"
            id="name"
            placeholder="Your name"
            type={"text"}
            name="name"
            value={details.name}
            onChange={changeHandler}
            autoComplete="name"
            helperText={errors.name && "Name is required."}
            error={errors.name}
            autoFocus
            sx={{ width: "90%" }}
          />

          <TextField
            margin="normal"
            fullWidth
            id="email"
            placeholder="Email"
            autoComplete="email"
            name="email"
            value={details.email}
            error={errors.email}
            helperText={errors.email && "Email is required."}
            onChange={changeHandler}
            autoFocus
            sx={{ width: "90%" }}
          />

          <TextField
            margin="normal"
            // required
            fullWidth
            id="mobileNum"
            placeholder="Mobile number"
            type={"text"}
            name="mobileNum"
            value={details.mobileNum}
            error={errors.mobileNum}
            helperText={errors.mobileNum && "Mobile number is required."}
            onChange={changeHandler}
            autoComplete="mobileNum"
            sx={{ width: "90%" }}
          />

          <TextField
            margin="normal"
            id="password"
            placeholder="Password"
            type="password"
            name="password"
            value={details.password}
            error={errors.password}
            helperText={errors.password && "Password is required."}
            onChange={changeHandler}
            autoComplete="password"
            sx={{ width: "90%" }}
          />

          <TextField
            margin="normal"
            placeholder="Confirm password"
            name="confirmPassword"
            value={details.confirmPassword}
            onChange={changeHandler}
            type="password"
            error={errors.confirmPassword}
            helperText={
              (details.confirmPassword.length > 0 &&
                details.confirmPassword !== details.password &&
                "This does not match with password.") ||
              (errors.confirmPassword && "Please confirm the password")
            }
            sx={{ width: "90%" }}
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
              SignUp
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
              <Grid item>Sign up using social media ?</Grid>
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
                <p>Already have an account ? </p>
                <Link to="/sign-in" className="link-redirect">
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default SignUp;
