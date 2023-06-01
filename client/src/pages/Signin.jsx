import { React, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import logo_pt from "../assets/images/favicon.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../slices/userSlice";
import { signIn } from "../middleware/auth";
import { Modal } from "@mui/material";
import EmailLink from "./EmailLink";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode'

const Signin = () => {

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID Token: "+response.credential);
        var userToken=jwt_decode(response.credential)
        console.log(userToken);
      }
    
      useEffect(()=>{
          /* global google */
        google.accounts.id.initialize({
          client_id:"985693759033-rmv490rsqv3deuq0c4iufaad8g5h38a1.apps.googleusercontent.com",
          callback:handleCallbackResponse
        })
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          {theme:"outline", size:"large" }
        )
      },[])

    const [details, setDetails] = useState({
        credential: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        credential: false,
        password: false,
    });

    const userState = useSelector(UserState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function changeHandler(e) {
        
        if (e.target.name === "credential") {
            setErrors({ ...errors, credential: false });
        }
        if (e.target.name === "password") {
            setErrors({ ...errors, password: false });
        }

        setDetails({ ...details, [e.target.name]: e.target.value });
        
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (details.credential === "" && details.password === "") {
            setErrors({ credential: true, password: true });
            return;
        }
        if (details.credential === "")
            setErrors({ ...errors, credential: true });
        if (details.password === "") setErrors({ ...errors, password: true });
        await signIn(details, dispatch, navigate);
    };
    const [openr, setOpenr] = useState(false);
    const handleOpenr = () => setOpenr(true);
    const handleCloser = () => setOpenr(false);
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
                        maxWidth: "500px",
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
                        <Link
                            to="/"
                            className="link-redirect"
                            style={{ color: "black" }}
                        >
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
                        type={"text"}
                        autoComplete="email"
                        name="credential"
                        onChange={changeHandler}
                        value={details.credential}
                        sx={{ width: "90%" }}
                        error={errors.credential}
                        helperText={
                            errors.credential &&
                            "Please enter you email/mobile."
                        }
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
                        helperText={
                            errors.password && "Please enter you password."
                        }
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
                            <li>
                                <p
                                    onClick={handleOpenr}
                                    style={{
                                        fontSize: "16px",
                                        color: "blue",
                                        textDecorationLine: "underline",
                                        cursor: "pointer"
                                    }}
                                >
                                    Forgot Password?
                                </p>
                            </li>
                        </Grid>
                    </div>
                    <div id="signInDiv">

                    </div>
                </Box>
            </form>
            <Modal
                open={openr}
                onClose={handleCloser}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <EmailLink
                    handleCloser={handleCloser}
                    name={details.email}
                />
            </Modal>
        </div>
    );
};

export default Signin;
