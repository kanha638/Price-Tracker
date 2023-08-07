import { EMAIL_USERNAME, transporter } from "../index";
import { priceDropMailTemplate } from "../templates/product";

export const sendEmailsendPriceDropMail = (
  username: string,
  email: string,
  oldPrice: string,
  newPrice: string,
  currency: string,
  productTitle: string,
  productImgLink: string,
  productPageLink: string,
) => {
  try {
    const mailOptions = {
      from: EMAIL_USERNAME,
      to: email,
      subject: `Price Drop! Now Save Big on Your Favourite Product! 🔥`,
      html: priceDropMailTemplate(username, oldPrice, newPrice, currency, productTitle, productImgLink, productPageLink),
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
