import axios from "axios";
import { profilePicUploadSuccess } from "../slices/userSlice";
import { serverURL } from "../utils/utilities";

const API = axios.create({ baseURL: serverURL });
export const uploadProfilePicture = async (file, dispatch, setFile, userID) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const result = await API.post(`/api/user/upload/${userID}`, formData, {
      withCredentials: true,
    });
    console.log(result.data);
    dispatch(profilePicUploadSuccess(result?.data?.profile_pic));
    setFile(null);
  } catch (error) {
    console.log(error);
  }
};
