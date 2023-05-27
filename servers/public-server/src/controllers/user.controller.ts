import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import brcypt from "bcrypt";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { name, email, currentPassword, mobileNum } = req.body;
    if (userID === res.locals.userData.id) {
      const getUser = await prisma.users.findUnique({
        where: {
          id: userID,
        },
        select: {
          id: true,
          password: true,
        },
      });
      if (!getUser) return res.status(404).json({ message: "User not found" });

      const validPassword = await brcypt.compare(
        currentPassword,
        getUser.password
      );
      if (!validPassword) return res.status(400).send("Invalid Password.");
      await prisma.users.update({
        where: {
          id: userID,
        },
        data: {
          name: name || undefined,
          email: email || undefined,
          mobileNum: mobileNum || undefined,
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
    /* 
    Removing the previous profile picture from the profile
    folder so storage management should be good 
     */

    const previousDetails = await prisma.users.findUnique({
      where: {
        id: userID,
      },
    });
    if (previousDetails?.profile_pic) {
      fs.unlink(
        `${path.join(__dirname, "../../files/Profile")}/${
          previousDetails?.profile_pic
        }`,
        function (err) {
          if (err && err.code == "ENOENT") {
            console.info(
              "Previous Profile pic File doesn't exist, won't remove it."
            );
          } else if (err) {
            console.error("Error occurred while trying to remove file");
          } else {
            console.info(`removed the previous profile pic.`);
          }
        }
      );
    }
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
        },
      });
      return res.json(updatedUserData);
    }
    return res.status(401).json({ message: "Unauthenticated" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
