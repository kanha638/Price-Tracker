import { Router } from "express";
import { sendPriceDropMail } from './../controller/product.controller';


const router = Router();

/*
   Send Product Price Drop Mail to user
   PATH : `/product/sendpricedropmail`
   REQUEST TYPE : POST 
   Body :{
      username: string,
      email: string,
      oldPrice: string,
      newPrice: string,
      productTitle: string,
      productImgLink: string,
      productPageLink: string,
    }
   Response : 
   Success : {message:"Email has been sent"}
*/
router.post("/sendpricedropmail", sendPriceDropMail);
export default router;
