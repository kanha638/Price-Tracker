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
import { uploadProfilePicture } from "../controllers/user.controller";
import { uploadProfilePic } from "../middleware/uploader";

const router = Router();

router.get(
  "/:userID",
  rateLimiterForUserDetails,
  verifyToken,
  getUserDetailsFromID
);

router.post(
  "/upload/:userID",
  rateLimiterForUserDetails,
  verifyToken,
  uploadProfilePic.single("file"),
  uploadProfilePicture
);

export default router;
