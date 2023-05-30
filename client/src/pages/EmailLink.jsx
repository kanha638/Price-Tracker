import { React, useState } from "react";
import { Button, TextField, Box, Typography, Grid } from "@mui/material";
import email from "..//assets//images//email.png";
const EmailLink = ({ handleCloser }) => {
    const [details, setDetails] = useState({
        email: "",
    });
    const [variable, setVariable] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
    });
    const changeHandler = (e) => {
        setErrors({ ...errors, [e.target.name]: false });
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("form submit");
        console.log(details);
        let { email } = {
            email: false,
        };

        if (details.email === "") email = true;
        console.log(email + "email");
        setErrors({ ...errors, email: email });
        if (details.email !== "") {
            setVariable(true && !email);
        } else if (details.email === "") {
            setVariable(false); 
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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

                        maxWidth: "550px",
                        width: "90%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
                    }}
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        // marginBottom: "30px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Button onClick={handleCloser}>
                            <i
                                class="fa-solid fa-arrow-left"
                                style={{
                                    fontSize: "25px",
                                    color: "black",
                                    // marginTop:"25px",
                                    // marginBottom:"25px"
                                }}
                            ></i>
                        </Button>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={email}
                            style={{ width: "80px", height: "80px" }}
                        />
                    </div>
                    {/* <div sytle={{width:"100%"}}> */}
                    <TextField
                        variant={"outlined"}
                        margin="normal"
                        placeholder="Email / mobile-number"
                        type={"text"}
                        autoComplete="email"
                        name="email"
                        onChange={changeHandler}
                        value={details.email}
                        sx={{ width: "90%" }}
                        error={errors.email}
                        helperText={
                            errors.email && "Please enter you email/mobile."
                        }
                    />
                    {variable && (
                        <p style={{ color: "green", textAlign: "center" }}>
                            Link has been sent to your email{" "}
                        </p>
                    )}
                    <Button
                        // onClick={handleOpen}
                        sx={{
                            marginTop: 3,
                            width: "88%",
                            height: "50px",
                            marginTop: "25px",
                            marginBottom: "15px",
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
                        Send
                    </Button>
                    {/* </div> */}
                </Box>
            </form>
        </div>
    );
};

export default EmailLink;
