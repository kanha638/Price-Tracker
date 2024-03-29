import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, response, Response } from "express";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import axios from "axios";
import { UAParser } from "ua-parser-js";
import { OAuth2Client } from "google-auth-library";
const prisma = new PrismaClient();

const googleclient = new OAuth2Client(process.env.GOOGLE_CLIENT_LOGIN);

const API_NOTIFICATION = axios.create({
  baseURL: process.env.NOTIFICATION_SERVER_URL,
});

export const setToken = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.userData;
    // Generating the Access Token
    const accessToken = jwt.sign(
      {
        id: userData!.id,
        email: userData!.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      }
    );
    // Generating the Refresh Token
    const refreshToken = jwt.sign(
      {
        email: userData!.email,
        id: userData!.id,
      },
      process.env.REFRESH_JWT_SECRET!
    );

    const finalToken = `${accessToken} ${refreshToken}`;
    res.set(
      "Set-Cookie",
      cookie.serialize("token", finalToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // At developmet Cookie will be insecure as we do not have SSL with us
        sameSite: "strict",
        maxAge: parseInt(process.env.COOKIE_EXPIRATION_TIME!, 10),
        path: "/", //cookie valid for whole site
      })
    );
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, mobileNum } = req.body;
    if (password.length < 7) {
      return res
        .status(401)
        .json({ message: "Password length should be more than 6" });
    }
    /*
        Will Check if Any User Already Exists with these credintials
    */
    const checkUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: email }, { mobileNum: mobileNum }],
      },
    });
    if (checkUser) {
      return res.status(401).json({
        message: "User with this email/Mobile Number already exists",
      });
    }

    const passwordHash = await brcypt.hash(password, 10);

    const userData = await prisma.users.create({
      data: {
        email: email,
        name: name,
        password: passwordHash,
        createdAt: new Date(),
        mobileNum: mobileNum,
      },
    });
    res.locals.userData = userData;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (token == "") {
      return res.status(401).json({ message: "Token is not found.." });
    }
    googleclient
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_LOGIN,
      })
      .then(async (response: any) => {
        const { email, email_verified, name, picture, exp } = response.payload;

        if (exp > Date.now()) {
          return res
            .status(401)
            .json({ message: "Token is expired please try again." });
        }
        if (email_verified === true) {
          const user = await prisma.users.findUnique({
            where: {
              email: email,
            },
          });
          const randomPassword = `${Math.floor(Math.random() * 1000000000)}`;
          const passwordHash = await brcypt.hash(randomPassword, 10);
          const randomMobileNumber = `${Math.floor(
            Math.random() * 10000000000
          )}`;
          console.log(randomMobileNumber);
          if (user) {
            res.locals.userData = user;
            next();
          } else {
            const userData = await prisma.users.create({
              data: {
                email: email,
                name: name,
                password: passwordHash,
                createdAt: new Date(),
                mobileNum: randomMobileNumber,
                profile_pic: picture,
              },
            });
            res.locals.userData = userData;
            next();
          }
        } else {
          return res.status(402).json({
            message:
              "Your email is not verified by google.please try login with email-password",
          });
        }
        // return res.json({ message: "working" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { credential, password } = req.body;

    /* Check if there is any user exists in database */
    const user = await prisma.users.findFirst({
      where: {
        OR: [{ email: credential }, { mobileNum: credential }],
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const matchPassword = await brcypt.compare(password, user.password);
    if (matchPassword) {
      res.locals.userData = user;
      return next();
    } else {
      return res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const Me = async (req: Request, res: Response) => {
  try {
    console.log(req.headers["user-agent"]);
    const { id } = res.locals.userData;
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        name: true,
        createdAt: true,
        id: true,
        mobileNum: true,
        profile_pic: true,
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ logOut: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const ForgotPasssword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const userAgent = req.headers["user-agent"];
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const browser = `${result!.browser.name}/(${result!.browser.version})`;
    const os = `${result!.os!.name}/(${result!.os.version})`;

    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      let recoveryToken = jwt.sign(
        {
          id: user!.id,
          email: user!.email,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "30m",
        }
      );
      // URL encoding
      recoveryToken = recoveryToken.replace(".", "%2E");
      await prisma.users.update({
        where: {
          id: user!.id,
        },
        data: {
          recovery_token: recoveryToken,
        },
      });

      await API_NOTIFICATION.post("/nf/user/resetpassword", {
        username: user?.name,
        email: user?.email,
        recoveryToken: recoveryToken,
        browser: browser,
        os: os,
      });

      return res.json({
        message: "A recovery email has been sent to your email.",
      });
    } else {
      return res
        .status(404)
        .json({ message: "User with this email does not exist." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetpassword = async (req: Request, res: Response) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(401).json({ message: "Both password does not match" });
    }
    if (password.length < 7) {
      return res
        .status(401)
        .json({ message: "Password length should be more than 6" });
    }
    let token = "";
    if (req.headers.authorization) {
      token = req.headers.authorization?.split(" ")[1];
    }
    token = token.replace("%2E", "."); // Decoding the recovery jwt token.
    jwt.verify(token, process.env.JWT_SECRET!, async (err: any, value: any) => {
      try {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res
              .status(401)
              .json({ message: "Recovery time expired please try again." });
          } else {
            return res.status(401).json({ message: "Invalid Token provided" });
          }
        } else {
          const user = await prisma.users.findUnique({
            where: { email: value.email },
            select: {
              id: true,
              recovery_token: true,
            },
          });
          if (!user) {
            return res
              .status(404)
              .json({ message: "User not found/token invalid." });
          }

          if (user!.recovery_token?.replace("%2E", ".") !== token) {
            return res.status(403).json({
              message: "This password reset link is invalid now.",
            });
          }
          const newpasswordHash = await brcypt.hash(password, 10);
          console.log(newpasswordHash);

          await prisma.users.update({
            where: {
              id: user!.id,
            },
            data: {
              password: newpasswordHash,
              recovery_token: "",
            },
          });

          return res
            .status(200)
            .json({ message: "Password changed successfully." });
        }
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
