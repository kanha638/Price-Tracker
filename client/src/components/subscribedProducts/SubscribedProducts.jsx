import React from "react";
import Data from "../../assets/dummyData";
import Shop from "../shops/Shop";
const SubscribedProducts = () => {
  return (
    <>
      <Shop productItems={Data.productItems} title={"Subscribed Products"} />
    </>
  );
};

export default SubscribedProducts;
