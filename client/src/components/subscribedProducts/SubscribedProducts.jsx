import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Data from "../../assets/dummyData";
import Shop, { ShopSkel } from "../shops/Shop";
import { fetchSubscribedProducts } from "../../middleware/product";
import { UserState } from "../../slices/userSlice";

const SubscribedProducts = () => {
  const userState = useSelector(UserState);
  const dispatch = useDispatch();
  const [subscribedProduct, setSubscribedProduct] = useState([]);
  useEffect(() => {
    const getSubscribedProducts = async () => {
      await fetchSubscribedProducts(dispatch, setSubscribedProduct);
    };
    getSubscribedProducts();
  }, []);
  return (
    <>
      {userState?.subscribedProductfetchStatusPending === true ? (
        <ShopSkel title={"Subscribed Products"} />
      ) : (
        <Shop productItems={subscribedProduct} title={"Subscribed Products"} />
      )}
      {/* <Shop productItems={subscribedProduct} title={"Subscribed Products"} /> */}
    </>
  );
};

export default SubscribedProducts;
