import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
const prisma = new PrismaClient();

export const getUserDetailsFromID = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const result = await prisma.users.findUnique({
      where: {
        id: userID,
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobileNum: true,
        profile_pic: true,
        createdAt: true,
        disabled: true,
      },
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const profile_pic_urn = req.file?.filename;
    if (userID === res.locals.userData.id) {
      await prisma.users.update({
        where: {
          id: userID,
        },
        data: {
          profile_pic: profile_pic_urn,
        },
      });

      const updatedUserData = await prisma.users.findUnique({
        where: {
          id: userID,
        },
        select: {
          id: true,
          profile_pic: true,
          name: true,
          email: true,
          createdAt: true,
          mobileNum: true,
          disabled: true,
        },
      });
      return res.json(updatedUserData);
    }
    return res.status(401).json({ message: "Unauthenticated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
