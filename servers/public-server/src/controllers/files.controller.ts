import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

/* This is the controller for getting the profile picture of the user*/
export const getProfilePicture = async (req: Request, res: Response) => {
  try {
    const { key } = req!.params;

    const readStream = fs.createReadStream(
      `${process.env.FILE_PATH}/Profile/${key}`
    );
    readStream.on("open", () => {
      readStream.pipe(res);
    });
    readStream.on("error", () => {
      return res.status(404).json({ message: "File Not Found" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
