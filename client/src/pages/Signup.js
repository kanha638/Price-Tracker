import React from "react";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import logo_pt from "../assets/images/favicon.jpeg";

const SignUp = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobileNum: "",
    password: "",
    confirmPassword: "",
  });
  function changeHandler(e) {
    setDetails({ ...details, [e.target.id]: [e.target.value] });
  }
  return (
    <div
      style={{
        backgroundColor: "#f8f4f3",
        minHeight: "100vh",
        margin: "0px",
        padding: "0px",
      }}
    >
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
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
            name="name"
            type={"text"}
            value={details.name}
            onChange={changeHandler}
            autoComplete="name"
            autoFocus
            sx={{ width: "90%" }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={details.email}
            placeholder="Email"
            name="email"
            autoComplete="email"
            onChange={changeHandler}
            autoFocus
            sx={{ width: "90%" }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="mobileNum"
            placeholder="Mobile number"
            name="mobileNum"
            type={"text"}
            value={details.mobileNum}
            // error={details.mobileNum.length !== 10 ? true : false}
            onChange={changeHandler}
            autoComplete="mobileNum"
            sx={{ width: "90%" }}
          />

          <TextField
            margin="normal"
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={details.password}
            onChange={changeHandler}
            autoComplete="password"
            sx={{ width: "90%" }}
          />

          <TextField
            margin="normal"
            name="confirmPassword"
            placeholder="Confirm password"
            value={details.confirmPassword}
            error={
              details.confirmPassword.length > 0 &&
              details.confirmPassword !== details.password
                ? true
                : false
            }
            onChange={changeHandler}
            type="password"
            sx={{ width: "90%" }}
          />
          <div style={{ width: "90%" }}>
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
            >
              SignUp
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
