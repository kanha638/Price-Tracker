import { React, useState } from "react";
import { Button, TextField, Box, Typography, Grid } from "@mui/material";
import lock from "..//assets//images//lock.png";
import { useParams } from "react-router-dom";
import { resetPassword } from "../middleware/auth";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../slices/userSlice";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { removeResetPasswordStatus } from "../slices/userSlice";
import { Link } from "react-router-dom";
const SetPasswordPage = () => {
  const [details, setDetails] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();
  const dispatch = useDispatch();
  const userState = useSelector(UserState);
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
  });
  const changeHandler = (e) => {
    setErrors({ ...errors, [e.target.name]: false });
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    let { password, confirmPassword } = {
      password: false,
      confirmPassword: false,
    };

    if (details.password === "") password = true;
    if (details.confirmPassword === "") confirmPassword = true;

    setErrors({ password: password, confirmPassword: confirmPassword });

    if (details?.confirmPassword !== "" && details?.password !== "") {
      await resetPassword(dispatch, details, token);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        backgroundColor: "#f8f4f3",
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
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

            maxWidth: "700px",
            width: "90%",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div>
            <img src={lock} style={{ width: "120px", height: "120px" }} />
          </div>

          <Typography style={{ fontSize: "25px" }}>
            {" "}
            SET NEW PASSWORD
          </Typography>
          <TextField
            variant={"outlined"}
            type={"password"}
            placeholder={"Enter your New password"}
            value={details.password}
            margin="normal"
            name="password"
            error={errors.password}
            helperText={errors.password && "Please enter new  password."}
            onChange={changeHandler}
            sx={{ width: "90%" }}
          />
          <TextField
            variant={"outlined"}
            type={"password"}
            placeholder={"Confirm password"}
            value={details.confirmPassword}
            margin="normal"
            name="confirmPassword"
            error={errors.confirmPassword}
            helperText={errors.confirmPassword && "Please Confirm password."}
            onChange={changeHandler}
            sx={{ width: "90%" }}
          />
          {userState?.setPasswordStatusSuccess === true && (
            <Collapse in={true} sx={{ width: "90%", padding: "1px" }}>
              <Alert
                severity="success"
                sx={{ width: "100%" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      dispatch(removeResetPasswordStatus());
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Success</AlertTitle>Password changed successfully
              </Alert>
            </Collapse>
          )}

          {userState?.setPasswordStatusError === true && (
            <Collapse in={true} sx={{ width: "90%", padding: "1px" }}>
              <Alert
                severity="error"
                sx={{ width: "100%" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      dispatch();
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                onClick={() => {
                  dispatch(removeResetPasswordStatus());
                }}
              >
                <AlertTitle>Error</AlertTitle>
                {userState?.setPasswordStatusMessage}
              </Alert>
            </Collapse>
          )}

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
              type="submit"
            >
              Submit
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
                <p>Password changed successfully ? </p>
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

export default SetPasswordPage;
