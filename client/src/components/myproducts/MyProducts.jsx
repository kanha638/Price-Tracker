import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProducts } from "../../middleware/product";
import { UserState } from "../../slices/userSlice";
import Shop, { ShopSkel } from "../shops/Shop";

const MyProducts = () => {
  const userState = useSelector(UserState);
  const dispatch = useDispatch();
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const getMyProducts = () => {
      fetchMyProducts(dispatch, setMyProducts);
    };
    getMyProducts();
  }, []);
  return (
    <>
      {userState?.myProductFetchStatusPending === true ? (
        <ShopSkel title={"My Products"} />
      ) : (
        <Shop productItems={myProducts} title={"My Products"} />
      )}
    </>
  );
};

export default MyProducts;
