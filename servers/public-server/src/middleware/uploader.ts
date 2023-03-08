import multer from "multer";
import path from "path";
import { Request } from "express";

export function makeId(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const ProfilePicStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./files/Profile");
  },
  filename: function (req, file, callback) {
    const name = makeId(15);
    callback(null, name + path.extname(file.originalname));
  },
});

const fileFilterForProfilePic = (req: Request, file: any, callback: any) => {
  if (file.mimetype === "file/jpeg" || "file/png") {
    callback(null, true);
  } else {
    callback(new Error("The photo must be a jpeg or png"), false);
  }
};

export const uploadProfilePic = multer({
  storage: ProfilePicStorage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilterForProfilePic,
});
