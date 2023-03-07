import { Router } from "express";

import {
  addProduct,
  getAddedProducts,
  getAllProducts,
  getProductDatabyID,
  getSubscribedProducts,
  subscribeProduct,
  unSubscribeProduct,
} from "../controllers/product.controller";
import { verifyToken } from "../middleware/auth";
import { rateLimiterForAddProduct } from "../middleware/rateLimiters";

const router = Router();

/*

    This Route is for adding a product into the database
    Only logged in user can access this route.
    Type : POST 
    URL : /api/product/add-product
    Body :
    {
        website:"",
        product_url : "",
    }

*/

router.post("/add-product", rateLimiterForAddProduct, verifyToken, addProduct);

/*

    This Route is for getting all the products present int the product table
    Type : GET
    URL : /api/product/all-products

*/
router.get("/all-products", getAllProducts);
/*

    This Route is for getting product details with product id 
    Type : GET
    URL : /api/product/:productID

*/
router.get("/:productID", verifyToken, getProductDatabyID);

/*

    This Route is for subscribing any perticular product
    Type : GET
    URL : /api/product/subscribe/:productID

*/

router.get("/subscribe/:productID", verifyToken, subscribeProduct);
/*
    This Route is for getting user's subscribed products
    Type : GET
    URL : /api/product/subscribed/my

*/
router.get("/subscribed/my", verifyToken, getSubscribedProducts);
/*

    This Route is for unsubscribing any perticular product
    Type : GET
    URL : /api/product/unsubscribe/:productID

*/
router.get("/unsubscribe/:productID", verifyToken, unSubscribeProduct);

/*
    This Route is for getting user's added product
    Type : GET
    URL : /api/product-added/subscribed/my

*/
router.get("/product-added/my", verifyToken, getAddedProducts);
export default router;
