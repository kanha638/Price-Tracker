import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();
/* This is the controller for getting the profile picture of the user*/
export const getProfilePicture = async (req: Request, res: Response) => {
  try {
    const { key } = req!.params;
    const profile_path = path.join(__dirname, "../../files/Profile");

    const readStream = fs.createReadStream(`${profile_path}/${key}`);
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

export const getProductPicture = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.products.findUnique({
      where: {
        id : id
      },
      select: {
        img_urn:true
      }
    })

    return res.json({
      success: true,
      img_url : data?.img_urn
    })
    
  } catch (error) {
     return res.status(500).json({ message: "Internal Server Error" });
  }
}
