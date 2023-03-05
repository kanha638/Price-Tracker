import { Request, Response, Router } from "express";
import {
  Me,
  setToken,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth";

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
router.post("/sign-up", signUp, setToken);

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
router.post("/sign-in", signIn, setToken);

/*

This Route is for getting the user information of user if he is logged in and refreshes the page
i will be using jwt accessToken to get the inside value return it the the frontend 

Type : GET
URL : /api/auth/me

*/
router.get("/me", verifyToken, Me);

/*

This Route is for signing-out the logged in user

Type : GET
URL : /api/auth/sign-out

*/
router.get("/sign-out", verifyToken, signOut);
export default router;
