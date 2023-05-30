import { Request, Response } from "express";
import { sendEmailpasswordResetLink } from "../mailers/user";

export const sendResetPasswordLink = (req: Request, res: Response) => {
  try {
    const { username, email, recoveryToken } = req.body;
    sendEmailpasswordResetLink(username, email, recoveryToken);
    return res
      .status(200)
      .json({ message: "Email has been sent to your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
