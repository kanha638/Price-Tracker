import React from "react";
import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";

const Shop = ({ productItems, title }) => {
  return (
    <>
      <section className="shop background">
        <div className="container d_flex ">
          <Catg />

          <div className="contentWidth">
            <div className="heading d_flex">
              <div className="heading-left row  f_flex">
                <h2>{title}</h2>
              </div>
              <div className="heading-right row "></div>
            </div>
            <div className="product-content  grid1">
              <ShopCart productItems={productItems} />
              <ShopCart productItems={productItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
