import React, { useState } from "react";
import { designVar } from "../../common/data";
import './../../styles/style.css';


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
                  {product.discount}% Off
                </span>
                <img src={product.cover} alt="" />
                <div className="product-like" style={{ cursor: "pointer" }}>
                  <i
                    className={`fa-${liked ? "solid" : "regular"} fa-heart`}
                    style={{ color: `${liked && "red"}` }}
                    onClick={change}
                  ></i>
                </div>
              </div>
              <div className="product-details">
              
              <div className="productNameOnHover">{product.name}</div>

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
                  <h4>${product.price}.00 </h4>
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
