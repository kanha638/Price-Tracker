import { Request, Response } from "express";
import { sendEmailsendPriceDropMail } from "../mailers/product";

export const sendPriceDropMail = (req: Request, res: Response) => {
  console.log("Inside controller>sendPriceDropMail");
  try {
      const { username, email, oldPrice, newPrice, currency, productTitle, productImgLink, productPageLink } = req.body;
      console.log(req.body);
      console.log(username);
      console.log(email);
      console.log(oldPrice);
      console.log(newPrice);
      console.log(productTitle);
      console.log(productImgLink);
      console.log(productPageLink);
      sendEmailsendPriceDropMail(username, email, oldPrice, newPrice, currency, productTitle, productImgLink, productPageLink);
      return res.status(200).json({ message: "PriceDrop email has been sent to your email!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal Server Error");
    }
};