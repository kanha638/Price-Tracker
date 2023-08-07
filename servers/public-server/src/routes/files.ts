import { Router } from "express";
import { getProfilePicture } from "../controllers/files.controller";
const router = Router();

router.get("/img/:key", getProfilePicture);

router.get("/product_img/:id",)

export default router;
