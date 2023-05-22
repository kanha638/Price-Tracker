import { React, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import logo_pt from "../assets/images/favicon.jpeg";
const Signin = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  function changeHandler(e) {
    setDetails({ ...details, [e.target.id]: [e.target.value] });
  }
  return (
    <div
      style={{
        backgroundColor: "#f8f4f3",
        minHeight: "100vh",
        position: "relative",
        margin: "0px",
        padding: "0px",
      }}
    >
      <p></p>
      <form>
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
            Login
          </Typography>

          <TextField
            variant={"outlined"}
            margin="normal"
            placeholder="Email / mobile-number"
            type={"email"}
            autoComplete="email"
            sx={{ width: "90%" }}
          />
          <TextField
            // id="outlined-password-input"
            variant={"outlined"}
            placeholder="Password"
            type={"password"}
            margin="normal"
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
              Login
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
                <p>Don't have an account ?</p>
                <Link to="/sign-up" className="link-redirect">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Signin;
