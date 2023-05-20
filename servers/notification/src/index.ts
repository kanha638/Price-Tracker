import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import appConfig from "./app-config";
dotenv.config();

const app = express();
const PORT = appConfig.PORT || 4200;

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

app.get("/", (_, res) => res.send("Hello From Notication Service."));
app.listen(PORT, async () => {
  console.log(`Notification service running at PORT:${PORT}`);
});
