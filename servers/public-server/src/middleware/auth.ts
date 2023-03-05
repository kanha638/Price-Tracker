import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookie from "cookie";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
FOR VARIFYING IF THE USER HAS VALID JWT TOKEN 
*/

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.cookies.token) {
      const accessToken = req.cookies.token.split(" ")[0];
      if (!accessToken) {
        return res.status(401).json({ message: "Unauthenticated" });
      }
      jwt.verify(
        accessToken,
        process.env.JWT_SECRET!,
        async (err: any, value: any) => {
          if (err) {
            console.log("access Token Expired");
            if (err.name === "TokenExpiredError") {
              const refresh_token = req.cookies.token.split(" ")[1];
              if (!refresh_token) {
                return res.status(401).json({ message: "Unauthenticated" });
              }
              jwt.verify(
                refresh_token,
                process.env.REFRESH_JWT_SECRET!,
                async (err1: any, value1: any) => {
                  if (err1) {
                    res.clearCookie("token");
                    return res.status(401).json({ error: "Unauthenticated" });
                  } else {
                    const user = await prisma.users.findUnique({
                      where: { email: value1.email },
                    });
                    if (!user) {
                      return res
                        .status(404)
                        .json({ message: "No User Present" });
                    }
                    res.locals.userData = user;
                    const newAccessToken = jwt.sign(
                      {
                        id: user!.id,
                        email: user!.email,
                      },
                      process.env.JWT_SECRET!,
                      {
                        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
                      }
                    );
                    const newRefreshToken = jwt.sign(
                      {
                        id: user!.id,
                        email: user!.email,
                      },
                      process.env.REFRESH_JWT_SECRET!
                    );

                    const finalToken = `${newAccessToken} ${newRefreshToken}`;

                    res.set(
                      "Set-Cookie",
                      cookie.serialize("token", finalToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: parseInt(
                          process.env.COOKIE_EXPIRATION_TIME!,
                          10
                        ),
                        path: "/",
                      })
                    );

                    return next();
                  }
                }
              );
            } else {
              return res.status(401).json({ error: "Unauthenticated" });
            }
          } else {
            const user = await prisma.users.findUnique({
              where: { email: value.email },
            });
            if (!user) throw new Error("No User!");
            res.locals.userData = user;
            return next();
          }
        }
      );
    } else {
      return res.status(401).json({ error: "Unauthenticated" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthenticated" });
  }
};
