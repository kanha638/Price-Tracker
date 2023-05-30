import { Router } from "express";
import { sendResetPasswordLink } from "../controller/user.controller";

const router = Router();

/*
   Sending Reset Password link 
   PATH : `/user/resetpassword`
   REQUEST TYPE : POST 
   Body :{
      username:"",
      email : "",
      recoveryToken:""
    }
   Response : 
   Success : {message:"Email has been send"}
*/
router.post("/resetpassword", sendResetPasswordLink);
export default router;
