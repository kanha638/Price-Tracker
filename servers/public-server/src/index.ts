import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
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

app.get("/", (_, res) => res.send("Hello From Price Tracker Backend"));
app.listen(PORT, async () => {
  console.log(`Server running at PORT:${PORT}`);

  try {
    console.log("Database has been connected Connected !!");
  } catch (err) {
    console.log(err);
  }
});
