import { EMAIL_USERNAME, transporter } from "../index";
import { resetPasswordTemplate } from "../templates/user";

export const sendEmailpasswordResetLink = (
  username: string,
  email: string,
  recoveryToken: string,
  os: string,
  browser: string
) => {
  try {
    const mailOptions = {
      from: EMAIL_USERNAME,
      to: email,
      subject: `Password reset link for Price-tracker account.`,
      html: resetPasswordTemplate(username, recoveryToken, os, browser),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Email sent");
      }
    });
  } catch (error) {
    console.log("Some error occured");
  }
};
