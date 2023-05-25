import React from "react";
import Data from "../../assets/dummyData";
import Shop from "../shops/Shop";

const MyProducts = () => {
  return (
    <>
      <Shop productItems={Data.productItems} title={"My Products"} />
    </>
  );
};

export default MyProducts;
