import { Router } from "express";
import { sendPriceDropMail } from './../controller/product.controller';


const router = Router();

/*
   Send Product Price Drop Mail to user
   PATH : `/product/sendpricedropmail`
   REQUEST TYPE : POST 
   Body :{
      username: "",
      email: "",
      oldPrice: "",
      newPrice: "",
      currency: "",
      productTitle: "",
      productImgLink: "",
      productPageLink: "",
    }
   Response : 
   Success : {message:"Email has been sent"}
*/
router.post("/sendpricedropmail", sendPriceDropMail);
export default router;
