import { Router } from "express";
import {
  ForgotPasssword,
  Me,
  resetpassword,
  setToken,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth";
import {
  rateLimiterAuth,
  rateLimiterForForgotPassword,
} from "../middleware/rateLimiters";

const router = Router();

/*

This Route is for registering a user into the database 
Type : POST 
URL : /api/auth/sign-up
Body :
{
  name:"",
  email:"",
  password:"",
  mobileNum:""
}

*/
router.post("/sign-up", rateLimiterAuth, signUp, setToken);

/*

This Route is for Signing In  a user into the database 
Type : POST 
URL : /api/auth/sign-in
Body :
{
  credential : "" // this could be email/mobile
  password : ""
}

*/
router.post("/sign-in", rateLimiterAuth, signIn, setToken);

/*

This Route is for getting the user information of user if he is logged in and refreshes the page
i will be using jwt accessToken to get the inside value return it the the frontend 

Type : GET
URL : /api/auth/me

*/
router.get("/me", rateLimiterAuth, verifyToken, Me);

/*

This Route is for signing-out the logged in user

Type : GET
URL : /api/auth/sign-out

*/
router.get("/sign-out", rateLimiterAuth, verifyToken, signOut);

/*

This Route is for Forgot password for the a user.

Type : POST
URL : /api/auth/forgot-pass
Body : {
  email : "" // Will ask email from user
}

*/

router.post("/forgot-pass", rateLimiterForForgotPassword, ForgotPasssword);

/*

This Route is for Resetting the password.
Type : POST
URL : /api/auth/reset-pass
Body : {
  password:"",
  confirmPassword:""
}
Headers : 
Authorization : "Bearer recoveryToken"

*/

router.post("/reset-pass", rateLimiterForForgotPassword, resetpassword);

export default router;
