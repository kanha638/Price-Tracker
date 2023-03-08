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
        disabled: true,
      },
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
