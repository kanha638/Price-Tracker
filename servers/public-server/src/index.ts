import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import fileRoutes from "./routes/files";
import { createStorageFolder } from "./startup";

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

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/file", fileRoutes);

app.get("/", (_, res) => res.send("Hello From Price Tracker Backend"));
app.listen(PORT, async () => {
  console.info(`Server running at PORT:${PORT}`);
  createStorageFolder();

  try {
    console.info("Database has been connected Connected !!");
  } catch (err) {
    console.log(err);
  }
});
