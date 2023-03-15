import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "./Copyright";
import { theme } from "../utils/themes";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {AuthStart} from '../slices/userSlice';
import { signUp } from "../middleware/auth";

export default function SignUp() {

  const [formValue,setFormValue]=useState({
    name:"",
    email:"",
    mobileNum:"",
    password:"",
    confirmPassword:""
  })
   
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp({
      name:formValue?.name,email:formValue?.email,mobileNum:formValue?.mobileNum,password: formValue?.password
    },dispatch,navigate)
  };
  const changeHandler=(e)=>{
    setFormValue({...formValue, [e.target.name]:e.target.value});
   
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#0C0B0B" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              value={formValue.name}
              onChange={changeHandler}
              autoComplete="name"
              autoFocus
            />
           
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={formValue.email}
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={changeHandler}
              autoFocus
            />
           
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobileNum"
              label="Mobile Number"
              name="mobileNum"
              value={formValue.mobileNum}
              error={formValue.mobileNum.length!==10 ? true : false}
              onChange={changeHandler}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formValue.password}
              onChange={changeHandler}
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirm Password"
              value={formValue.confirmPassword}
              error={formValue.confirmPassword.length>0 && (formValue.confirmPassword!==formValue.password) ? true : false}
              onChange={changeHandler}
              type="password"
            />
           
            <Button
              type="submit"
              fullWidth
              color="neutral"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Typography paddingTop={4}>
        <Copyright />
      </Typography>
    </ThemeProvider>
  );
}
