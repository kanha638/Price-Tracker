import { React, useState } from "react";
import { Button, TextField, Box, Typography, Grid } from "@mui/material";
import lock from "..//assets//images//lock.png";
const SetPasswordPage = () => {
    const [details, setDetails] = useState({
        password: "",
        confirmpassword: "",
    });
    const [errors, setErrors] = useState({
        password: false,
        confirmpassword: false,
    });
    const changeHandler = (e) => {
        setErrors({ ...errors, [e.target.name]: false });
        setDetails({ ...details, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        
        let { password, confirmpassword } = {
            password: false,
            confirmpassword: false,
        };

        if (details.password === "") password = true;
        if (details.confirmpassword === "") confirmpassword = true;
       
        setErrors({ password: password, confirmpassword: confirmpassword });
        
        
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
                        <img src={lock}  style={{width:"120px",height:"120px"}}/>
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
                        helperText={
                            errors.password && "Please enter new  password."
                        }
                        onChange={changeHandler}
                        sx={{ width: "90%" }}
                    />
                    <TextField
                        variant={"outlined"}
                        type={"password"}
                        placeholder={"Confirm password"}
                        value={details.confirmpassword}
                        margin="normal"
                        name="confirmpassword"
                        error={errors.confirmpassword}
                        helperText={
                            errors.confirmpassword && "Please Confirm password."
                        }
                        onChange={changeHandler}
                        sx={{ width: "90%" }}
                    />
                    <Button
                        // onClick={handleClose}
                        sx={{
                            marginTop: 3,
                            width: "90%",
                            height: "50px",
                        }}
                        style={{
                            borderRadius: 3,
                            backgroundColor: "black",
                            padding: "10px 10px",
                            marginBottom:"30px",
                            fontSize: "20px",
                        }}
                        variant="contained"
                        type="submit"
                    >
                        Save
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default SetPasswordPage;
