

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userID = res.locals.userData.id;

    const result = await prisma.notification.findMany({
      where: {
        usersId: userID,
        deleted : false
      },
      select: {
        id: true,
        text: true,
        auth: true,
        product_id: true,
        usersId: true,
        product_link: true,
        time: true,
        product_img : true
      },
      orderBy: {
        time:"desc"
      }
    });
    return res.json(result)
  } catch (error) {
     return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const MakeNotificationRead = async(req : Request,res:Response) => {
  try {
    const { id } = req.params;

    await prisma.notification.update({
      where: {
        id : id
      },
      data: {
        read:true
      }
    })
    return res.json({
      success: true,
      message:"Request completed Successfully"
    })
  } catch (error) {
     return res.status(500).json({ message: "Internal Server Error" });
  }
}


export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.notification.update({
      where: {
        id: id
      },
      data: {
        deleted: true
      }
    });
    return res.json({success:true,message:"Notification deleted successfully"})
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getUnreadNotificationCount = async (req:Request,res:Response) => {
  try {
    const nfWithCount = await prisma.notification.count({
      where: {
        usersId: res.locals.userData.id,
        read : false
     }
    })
    
    return res.json({
      success: true,
      unread_notification: nfWithCount
    });
  } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
  }
}


export const markAllRead = async (req: Request, res: Response) => {
    try {
        const userID = res.locals.userData.id;

        await prisma.notification.updateMany({
            where: {
                usersId: userID,
                deleted : false
            },
            data: {
                read : true
            }
        })
        return res.json({success:true,message:"Marked all message as read"})
        
    } catch (error) {
         return res.status(500).json({ message: "Internal Server Error" });
    }
}