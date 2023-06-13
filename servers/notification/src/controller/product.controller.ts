import { Request, Response } from "express";
import { sendEmailsendPriceDropMail } from "../mailers/product";

export const sendPriceDropMail = (req: Request, res: Response) => {
  try {
      const { username, email, oldPrice, newPrice, currency, productTitle, productImgLink, productPageLink } = req.body;
      sendEmailsendPriceDropMail(username, email, oldPrice, newPrice, currency, productTitle, productImgLink, productPageLink);
      return res.status(200).json({ message: "PriceDrop email has been sent to your email!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal Server Error");
    }
};