import {
  AddProductError,
  AddProductStart,
  AddProductSuccess,
  fetchAllProductsError,
  fetchAllProductsStart,
  fetchAllProductsSuccess,
  likeProductError,
  likeProductPending,
  likeProductSuccess,
  myProductsFetchError,
  myProductsFetchStart,
  myProductsFetchSuccess,
  subscribedProductfetchError,
  subscribedProductfetchStart,
  subscribedProductfetchSuccess,
} from "../slices/userSlice";
import axios from "axios";
import { serverURL } from "../utils/utilities";
const API = axios.create({ baseURL: serverURL });
export const AddProduct = async (data, dispatch, setOpen = () => {}) => {
  dispatch(AddProductStart());
  try {
    const response = await API.post("/api/product/add-product", data, {
      withCredentials: true,
    });
    console.log(response.data);
    dispatch(AddProductSuccess(response.data));
    setOpen(false);
  } catch (error) {
    console.log(error);
    dispatch(AddProductError(error.response));
  }
};

export const fetchAllProducts = async (dispatch) => {
  dispatch(fetchAllProductsStart());
  try {
    const response = await API.get("/api/product/all-products");
    dispatch(fetchAllProductsSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(fetchAllProductsError(error.response));
  }
};

export const fetchMyProducts = async (dispatch, setMyProducts = () => {}) => {
  dispatch(myProductsFetchStart());
  try {
    const response = await API.get("/api/product/product-added/my", {
      withCredentials: true,
    });

    setMyProducts(response.data);
    dispatch(myProductsFetchSuccess(response.data));
  } catch (error) {
    dispatch(myProductsFetchError(error.response));
  }
};
export const fetchSubscribedProducts = async (dispatch, setSubscribedProducts = () => {}) =>{
  dispatch(subscribedProductfetchStart());
  try {
    const response = await API.get("/api/product/subscribed/my",{
      withCredentials:true
    });

    setSubscribedProducts(response.data);
    dispatch(subscribedProductfetchSuccess(response.data));
  } catch (error) {
    dispatch(subscribedProductfetchError(error.response));
  }
}

export const likeProduct = async (dispatch, setlikeOnThisProduct = () => {}, id) =>{
  dispatch(likeProductPending());
  try{
    const response = await API.get(`/api/product/subscribe/${id}`, {
      withCredentials:true
    });

    setlikeOnThisProduct(true);
    dispatch(likeProductSuccess(response.data));
  }
  catch(error){
    dispatch(likeProductError(error.response));
  }
}
