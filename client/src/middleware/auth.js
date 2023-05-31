import {
  AuthError,
  AuthStart,
  AuthSuccess,
  forgotPassError,
  forgotPassStart,
  forgotPassSuccess,
  MeError,
  MeStart,
  MeSuccess,
  resetPasswordError,
  resetPasswordStart,
  resetPasswordSuccess,
  SignOutError,
  SignOutStart,
  SignOutSuccess,
} from "../slices/userSlice";
import axios from "axios";
import { serverURL } from "../utils/utilities";

const API = axios.create({ baseURL: serverURL });

export const signUp = async (data, dispatch, navigate) => {
  dispatch(AuthStart());
  try {
    const response = await API.post("/api/auth/sign-up", data, {
      withCredentials: true,
    });
    dispatch(AuthSuccess(response.data));
    navigate("/");
  } catch (error) {
    dispatch(AuthError(error.response));
    console.log(error);
  }
};
export const signIn = async (
  data,
  dispatch,
  navigate,
  handleClose = () => {}
) => {
  dispatch(AuthStart());
  try {
    const response = await API.post("/api/auth/sign-in", data, {
      withCredentials: true,
    });
    dispatch(AuthSuccess(response.data));
    handleClose();
    navigate("/");
  } catch (error) {
    dispatch(AuthError(error.response));
    console.log(error);
  }
};

export const signOut = async (dispatch, navigate) => {
  dispatch(SignOutStart());
  try {
    await API.get("/api/auth/sign-out", {
      withCredentials: true,
    });
    dispatch(SignOutSuccess());
    navigate("/sign-in");
  } catch (error) {
    dispatch(SignOutError(error.response));
    console.log(error);
  }
};

export const Me = async (dispatch) => {
  dispatch(MeStart());
  try {
    const response = await API.get("/api/auth/me", {
      withCredentials: true,
    });
    dispatch(MeSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(MeError(error.response));
  }
};

export const forgotPassword = async (dispatch, data) => {
  dispatch(forgotPassStart());
  try {
    const response = await API.post("/api/auth/forgot-pass", data, {
      withCredentials: true,
    });

    dispatch(forgotPassSuccess());
  } catch (error) {
    console.log(error);
    dispatch(forgotPassError(error.response));
  }
};

export const resetPassword = async (dispatch, data, token) => {
  dispatch(resetPasswordStart());
  try {
    const response = await API.post("/api/auth/reset-pass", data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(resetPasswordSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(resetPasswordError(error.response));
  }
};
