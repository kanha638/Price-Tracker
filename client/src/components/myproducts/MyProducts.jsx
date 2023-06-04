import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Data from "../../assets/dummyData";
import { fetchMyProducts } from "../../middleware/product";
import { UserState } from "../../slices/userSlice";
import Shop from "../shops/Shop";

const MyProducts = () => {
  const userState = useSelector(UserState);
  const dispatch = useDispatch();
  const [myProducts, setMyProducts] = useState([]);
  useEffect(() => {
    const getMyProducts = async () => {
      await fetchMyProducts(dispatch, setMyProducts);
    };
    getMyProducts();
  }, []);
  return (
    <>
      <Shop productItems={myProducts} title={"My Products"} />
    </>
  );
};

export default MyProducts;
