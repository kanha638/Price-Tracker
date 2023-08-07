import {
  AddProductError,
  AddProductStart,
  AddProductSuccess,
  fetchAllProductsError,
  fetchAllProductsStart,
  fetchAllProductsSuccess,
  GetProductFromIDError,
  GetProductFromIDStart,
  GetProductFromIDSuccess,
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

export const getProductByID = async (id, setProduct = () => { },dispatch) => {
  dispatch(GetProductFromIDStart())
  try {
    console.log(id)
    const result = await API.get(`/api/product/${id}`, { withCredentials: true });
   setProduct(result?.data);
   dispatch(GetProductFromIDSuccess())
  } catch (error) {
    console.log(error);
    console.log("some error occured");
    dispatch(GetProductFromIDError())
  }
}


export const getProductImageFromID = async (id) => {
  try {
    const result = await API.get(`/api/file/product_img/:${id}`, { withCredentials: true });
    return result.data.img_urn;
  } catch (error) {
    console.log(error);
    console.log("Some error occured on fetching product img")
  }
}