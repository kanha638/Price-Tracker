import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import appConfig from "./app-config";
import nodemailer from "nodemailer";
dotenv.config();
import userRoutes from "./routes/user";

const app = express();
const PORT = appConfig.PORT || 4200;
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use("/nf/user", userRoutes);

app.get("/", (_, res) => res.send("Hello From Notication Service."));
app.listen(PORT, async () => {
  console.log(`Notification service running at PORT:${PORT}`);
});
