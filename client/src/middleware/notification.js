import axios from "axios";
import { NotificationsfetchError, NotificationsfetchStart, NotificationsfetchSuccess, profilePicUploadSuccess, SetNotificationNumber } from "../slices/userSlice";
import { serverURL } from "../utils/utilities";


const API = axios.create({ baseURL: serverURL });


export const getNumberOfNotification = async (dispatch) => {
    try {
      console.log("hello world")
      const result = await API.get("/api/nf/getunreadcount", {
        withCredentials:true
      })
      const data = result.data;
        dispatch(SetNotificationNumber(data.unread_notification))
        
      return data.unread_notification || 0;
    
  } catch (error) {
    console.log(error)
    console.log("some error occured")
    return 0;
  }
}


export const getNotifications = async (dispatch) => {
    dispatch(NotificationsfetchStart())
    try {

        const result = await API.get("/api/nf/notifications", {
        withCredentials:true
        })
        
    dispatch(NotificationsfetchSuccess(result?.data))
        
    } catch (error) {
        dispatch(NotificationsfetchError())
        
    }
}