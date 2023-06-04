import React, { useState } from "react";
import { designVar } from "../../common/data";
import "./../../styles/style.css";

const ShopCart = ({ productItems }) => {
  const [liked, setLiked] = useState(false);
  const change = () => {
    setLiked((val) => !val);
  };

  return (
    <>
      {productItems.map((product, index) => {
        return (
          <div className="box" style={{ width: "90%", height: "100%" }}>
            <div className="product mtop">
              <div className="img">
                <span
                  className="discount"
                  style={{
                    backgroundColor: designVar.colors.iconBackgroundColor,
                  }}
                >
                  {product?.mrp
                    ? Math.round(
                        ((product?.mrp - product?.current_price) /
                          product?.mrp) *
                          100
                      )
                    : "NA"}
                  {product?.mrp ? "% Off" : ""}
                </span>
                <img
                  src={product?.img_urn}
                  alt=""
                  style={{ width: "100%", height: "250px" }}
                />
                <div className="product-like" style={{ cursor: "pointer" }}>
                  <i
                    className={`fa-${liked ? "solid" : "regular"} fa-heart`}
                    style={{ color: `${liked && "red"}` }}
                    onClick={change}
                  ></i>
                </div>
              </div>
              <div className="product-details">
                <div className="productNameOnHover">
                  {product.product_title}
                </div>

                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <div
                  className="price"
                  style={{ color: designVar.colors.iconTextColor }}
                >
                  <h4>
                    {product?.currecy_type === "INR" ? "₹ " : "$ "}
                    {product.current_price}.00{" "}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
