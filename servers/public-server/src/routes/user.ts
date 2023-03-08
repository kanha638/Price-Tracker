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
import { getUserDetailsFromID } from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth";
import { rateLimiterForUserDetails } from "../middleware/rateLimiters";

const router = Router();

router.get(
  "/:userID",
  rateLimiterForUserDetails,
  verifyToken,
  getUserDetailsFromID
);

export default router;
