import { createSlice } from "@reduxjs/toolkit";
import {
  clearLcoalCache,
  getItemFromLocalCache,
  setItemInLocalCache,
} from "../cache/localStorage";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: getItemFromLocalCache("userInfo"),
    isLoggedIn: getItemFromLocalCache("isLoggedIn") === null ? false : true,
    isPending: false,
    isErrors: false,
    errorMessage: {
      authForms: "",
    },
    allProducts: [],
    myProducts: [],
    number_nf: getItemFromLocalCache("number_nf") === null ? 0 : getItemFromLocalCache("number_nf"),
    notifications : []
  },
  reducers: {

    SetNotificationNumber: (state, action) => {
      state.number_nf = action.payload;
      setItemInLocalCache("number_nf", action.payload);
    },
    AuthStart: (state) => {
      state.isPending = true;
    },
    AuthSuccess: (state, action) => {
      state.isPending = false;
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      setItemInLocalCache("userInfo", action.payload);
      setItemInLocalCache("isLoggedIn", true);
    },
    AuthError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
      state.errorMessage.authForms = action.payload.data.message;
    },
    SignOutStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    SignOutSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.userInfo = null;
      state.isLoggedIn = false;
      clearLcoalCache();
    },
    SignOutError: (state) => {
      state.isErrors = true;
      state.isPending = false;
    },
    MeStart: (state) => {
      state.isPending = true;
    },
    MeSuccess: (state, action) => {
      state.isPending = false;
      state.isLoggedIn = true;
      state.isErrors = false;
      state.userInfo = action.payload;
      setItemInLocalCache("userInfo", action.payload);
      setItemInLocalCache("isLoggedIn", true);
    },
    MeError: (state, action) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.isPending = false;
      clearLcoalCache();
    },
    AddProductStart: (state) => {
      state.isPending = true;
      state.addproductSuccess = false;
      state.addproductError = false;
      state.addproductErrorMessage = "";
    },
    AddProductSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.allProducts.unshift(action.payload);
      state.addproductSuccess = true;
    },
    AddProductError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
      state.addproductError = true;
      state.addproductErrorMessage = action.payload.data.message;
    },
    fetchAllProductsStart: (state) => {
      state.isPending = true;
    },
    fetchAllProductsSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.allProducts = action.payload;
    },
    fetchAllProductsError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
    profilePicUploadSuccess: (state, action) => {
      state.isErrors = false;
      state.userInfo.profile_pic = action.payload;
    },
    removeAddProductStatus: (state) => {
      state.addproductError = false;
      state.addproductSuccess = false;
      state.addproductErrorMessage = "";
    },
    forgotPassStart: (state) => {
      state.forgotPassPending = true;
      state.forgotPassErrorStatus = false;
    },
    forgotPassSuccess: (state) => {
      state.forgotPassSuccessStatus = true;
      state.forgotPassPending = false;
    },
    forgotPassError: (state, action) => {
      state.forgotPassErrorStatus = true;
      state.forgotPassPending = false;
      if (action.payload.status === 429) {
        state.forgotPassErrorErrorMessage = action.payload.data;
      } else {
        state.forgotPassErrorErrorMessage = action.payload.data.message;
      }
    },
    removeforgotPassStatus: (state) => {
      state.forgotPassErrorStatus = false;
      state.forgotPassSuccessStatus = false;
      state.forgotPassErrorErrorMessage = "";
    },
    resetPasswordStart: (state) => {
      state.setPasswordPending = true;
      state.setPasswordStatusError = false;
      state.setPasswordStatusSuccess = false;
    },
    resetPasswordSuccess: (state, action) => {
      state.setPasswordPending = false;
      state.setPasswordStatusError = false;
      state.setPasswordStatusSuccess = true;
      clearLcoalCache();
    },
    resetPasswordError: (state, action) => {
      state.setPasswordPending = false;
      console.log(action.payload);
      state.setPasswordStatusError = true;
      if (action.payload.status === 429) {
        console.log(action.payload);
        state.setPasswordStatusMessage = action.payload.data;
      } else {
        state.setPasswordStatusMessage = action.payload.data.message;
      }
    },
    removeResetPasswordStatus: (state) => {
      state.setPasswordStatusError = false;
      state.setPasswordStatusMessage = "";
      state.setPasswordStatusSuccess = false;
    },

    myProductsFetchStart: (state) => {
      state.myProductFetchStatusPending = true;
      state.myProductFetchStatusError = false;
      state.myProductFetchStatusSuccess = false;
    },
    myProductsFetchSuccess: (state, action) => {
      state.myProductFetchStatusPending = false;
      state.myProductFetchStatusError = false;
      state.myProductFetchStatusSuccess = true;
      state.myProducts = action.payload;
    },
    myProductsFetchError: (state, action) => {
      state.myProductFetchStatusPending = false;
      state.myProductFetchStatusError = true;
      state.myProductFetchStatusSuccess = false;
      state.myProductFetchStatusErrorrMessage = action.payload.data.message;
    },
    RemoveMyProductsfetchStatus: (state) => {
      state.myProductFetchStatusError = false;
      state.myProductFetchStatusSuccess = false;
      state.myProductFetchStatusErrorrMessage = "";
    },

    //for subscribed Product
    subscribedProductfetchStart : (state) =>{
      state.subscribedProductfetchStatusSuccess = false;
      state.subscribedProductfetchStatusPending = true;
      state.subscribedProductfetchStatusError = false;
    },
    subscribedProductfetchError: (state, action) =>{
      state.subscribedProductfetchStatusPending = false;
      state.subscribedProductfetchStatusSuccess = false;
      state.subscribedProductfetchStatusError = true;
      state.subscribedProductfetchStatusErrorMessage = action.payload.data.message;
    },
    subscribedProductfetchSuccess: (state, action) =>{
      state.subscribedProductfetchStatusSuccess = true;
      state.subscribedProductfetchStatusPending = false;
      state.subscribedProductfetchStatusError = false;
      state.subscribedProducts = action.payload;
    },
    RemoveSubscribedProductfetchstatus: (state) =>{
      state.subscribedProductfetchStatusSuccess = false;
      state.subscribedProductfetchStatusError = false;
      state.RemoveSubscribedProductfetchstatusMessage = "";
    },

    // for notification 

    NotificationsfetchStart : (state) =>{
      state.notificationfetchStatusSuccess = false;
      state.notificationfetchStatusPending = true;
      state.notificationfetchStatusError = false;
    },
    NotificationsfetchError: (state, action) =>{
      state.notificationfetchStatusPending = false;
      state.notificationfetchStatusSuccess = false;
      state.notificationfetchStatusError = true;
      state.notificationfetchStatusErrorMessage = action.payload.data.message;
    },
    NotificationsfetchSuccess: (state, action) =>{
      state.notificationfetchStatusSuccess = true;
      state.notificationfetchStatusPending = false;
      state.notificationfetchStatusError = false;
      state.notifications = action.payload;
    },
    NotificationsProductfetchstatus: (state) =>{
      state.notificationfetchStatusSuccess = false;
      state.notificationfetchStatusError = false;
      state.notificationfetchstatusMessage = "";
    },
    GetProductFromIDStart: (state) => {
      state.getProductFromIdSuccess = false;
      state.getProductFromIdPending = true;
      state.getProductFromIdError = false;
    },
    GetProductFromIDSuccess: (state) => {
      state.getProductFromIdSuccess = true;
      state.getProductFromIdPending = false;
      state.getProductFromIdError = false;
    },
    GetProductFromIDError: (state) => {
      state.getProductFromIdSuccess = false;
      state.getProductFromIdPending = false;
      state.getProductFromIdError = true;
    },


  },
});
export const {
  AuthStart,
  AuthSuccess,
  AuthError,
  SignOutError,
  SignOutStart,
  SignOutSuccess,
  MeStart,
  MeSuccess,
  MeError,
  AddProductError,
  AddProductStart,
  removeAddProductStatus,
  AddProductSuccess,
  fetchAllProductsError,
  fetchAllProductsStart,
  fetchAllProductsSuccess,
  profilePicUploadSuccess,
  forgotPassStart,
  forgotPassError,
  forgotPassSuccess,
  removeforgotPassStatus,
  resetPasswordSuccess,
  resetPasswordStart,
  resetPasswordError,
  removeResetPasswordStatus,
  myProductsFetchError,
  myProductsFetchStart,
  myProductsFetchSuccess,
  RemoveMyProductsfetchStatus,
  subscribedProductfetchStart,
  subscribedProductfetchError,
  subscribedProductfetchSuccess,
  RemoveSubscribedProductfetchstatus,
  SetNotificationNumber,
  NotificationsProductfetchstatus,
  NotificationsfetchError,
  NotificationsfetchStart,
  NotificationsfetchSuccess,
  GetProductFromIDError,
  GetProductFromIDStart,
  GetProductFromIDSuccess
} = userSlice.actions;
export const selectUser = (state) => state.user.userInfo;
export const UserState = (state) => state.user;

export default userSlice.reducer;
