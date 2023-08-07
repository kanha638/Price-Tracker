import { Router } from "express";
import { deleteNotification, getNotifications, getUnreadNotificationCount, MakeNotificationRead, markAllRead, } from "../controllers/notification.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get("/notifications", verifyToken, getNotifications);

router.get("/makeRead/:id", verifyToken, MakeNotificationRead);

router.get("/deletenf/:id", verifyToken, deleteNotification);

router.get("/getunreadcount", verifyToken, getUnreadNotificationCount);

router.get("/mark_all_read",verifyToken,markAllRead)

export default router;
