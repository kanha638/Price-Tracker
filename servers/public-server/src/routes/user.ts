import { Router } from "express";
import {  getUserDetailsFromID,updateUserDetails } from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth";
import { rateLimiterForUserDetails,rateLimiterUserUpdate } from "../middleware/rateLimiters";
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
router.put("/:userID", rateLimiterUserUpdate, verifyToken, updateUserDetails);



export default router;
