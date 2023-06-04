import {
  AddProductError,
  AddProductStart,
  AddProductSuccess,
  fetchAllProductsError,
  fetchAllProductsStart,
  fetchAllProductsSuccess,
  myProductsFetchError,
  myProductsFetchStart,
  myProductsFetchSuccess,
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
