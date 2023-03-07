import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, response, Response } from "express";

// import axios from "axios";
const axios = require("axios").default;
import { AxiosResponse } from "axios";
const prisma = new PrismaClient();
const API = axios.create({ baseURL: process.env.SCRAPPING_SERVER_URL });

interface ProductFetch {
  Title: string;
  Image_Link: string;
  Availability: string;
  Rating: string;
  Price: string;
  Rating_Count: string;
}

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { website, product_url } = req.body;
    const userID = res.locals.userData.id;

    const prevProduct = await prisma.products.findUnique({
      where: {
        product_link: product_url,
      },
    });
    if (prevProduct) {
      return res.status(400).json({
        message: "Product is already present in the database",
      });
    }

    API.post(
      `/product/register/`,
      {
        website: website,
        url: product_url,
      },
      { withCredentials: true }
    )
      .then(async (response: any) => {
        try {
          let result: ProductFetch = response.data;
          if (
            result.Title &&
            result.Price &&
            result.Availability &&
            result.Rating &&
            result.Image_Link
          ) {
            const product = await prisma.products.create({
              data: {
                img_urn: result!.Image_Link,
                product_link: product_url,
                availabe: result!.Availability,
                website: website,
                current_price: parseFloat(result!.Price),
                usersId: userID,
                product_title: result!.Title,
                rating_count: parseInt(result!.Rating_Count, 10),
                rating: parseFloat(result!.Rating),
                subscribers: res.locals.userData.email,
                createdAt: new Date(),
              },
            });
            await prisma.priceAlter.create({
              data: {
                productsId: product?.id,
                price: product?.current_price,
                date: new Date(),
              },
            });
          } else {
            return res.status(500).json({
              message: "Some Error on scrapping server / Unable to scrap",
            });
          }
          return res.json({ message: "Product added successfully" });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      })
      .catch(console.error);
    // return res.status(500).json({
    //   message: "Something went wrong",
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await prisma.products.findMany({
      select: {
        id: true,
        product_link: true,
        product_title: true,
        current_price: true,
        mrp: true,
        img_urn: true,
        availabe: true,
        rating: true,
        rating_count: true,
        currecy_type: true,
        usersId: true,
        website: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const subscribeProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;

    const productData = await prisma.products.update({
      where: {
        id: parseInt(productID, 10),
      },
      data: {
        subscribers: {
          push: res.locals.userData.email,
        },
      },
    });

    return res.json({ message: "Subscribed to the product successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const unSubscribeProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;

    const productData = await prisma.products.findFirst({
      where: {
        id: parseInt(productID, 10),
      },
    });

    const newSubscribers = productData!.subscribers.filter(
      (elem) => elem != res.locals?.userData?.email
    );

    const newProductdata = await prisma.products.update({
      where: {
        id: parseInt(productID, 10),
      },
      data: {
        subscribers: newSubscribers,
      },
    });

    return res.json({ message: "Unsubscribed to the product successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getProductDatabyID = async (req: Request, res: Response) => {
  try {
    const { productID } = req.body;

    const result = await prisma.products.findUnique({
      where: {
        id: parseInt(productID),
      },
      select: {
        id: true,
        product_link: true,
        product_title: true,
        current_price: true,
        mrp: true,
        availabe: true,
        rating: true,
        rating_count: true,
        currecy_type: true,
        usersId: true,
        prices: {
          select: {
            price: true,
            date: true,
          },
        },
      },
    });

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getSubscribedProducts = async (req: Request, res: Response) => {
  try {
    const result = await prisma.products.findMany({
      where: {
        subscribers: {
          has: res.locals.userData?.email,
        },
      },
      select: {
        id: true,
        product_link: true,
        product_title: true,
        current_price: true,
        mrp: true,
        availabe: true,
        rating: true,
        rating_count: true,
        currecy_type: true,
        usersId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const getAddedProducts = async (req: Request, res: Response) => {
  try {
    const result = await prisma.products.findMany({
      where: {
        usersId: res.locals?.userData.id,
      },
      select: {
        id: true,
        product_link: true,
        product_title: true,
        current_price: true,
        mrp: true,
        availabe: true,
        rating: true,
        rating_count: true,
        currecy_type: true,
        usersId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
