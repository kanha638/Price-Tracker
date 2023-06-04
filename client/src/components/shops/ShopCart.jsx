import React from "react";
import "./../../styles/style.css";
import { ShopBox, ShopBoxSkel } from "./ShopBox";
const ShopCart = ({ productItems }) => {
  return (
    <>
      {productItems.map((product, index) => {
        return (
          <>
            <ShopBox product={product} />
            {/* <ShopBoxSkel /> */}
          </>
        );
      })}
    </>
  );
};

export const ShopCartSkeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {arr.map((index, data) => {
        return <ShopBoxSkel />;
      })}
    </>
  );
};

export default ShopCart;
