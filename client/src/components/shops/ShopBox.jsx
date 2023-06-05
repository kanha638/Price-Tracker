import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import { designVar } from "../../common/data";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Rating from "@mui/material/Rating";

const productImgLinks = {
  flipkart:
    "https://cdn.icon-icons.com/icons2/726/PNG/512/flipkart_icon-icons.com_62650.png",
  myntra:
    "https://cdn.iconscout.com/icon/free/png-256/free-myntra-2709168-2249158.png",
};
export const ShopBox = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const change = () => {
    setLiked((val) => !val);
  };
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
                  ((product?.mrp - product?.current_price) / product?.mrp) * 100
                )
              : "NA"}
            {product?.mrp ? "% Off" : ""}
          </span>

          {/* {product ? (
                  <img
                    src={product?.img_urn}
                    alt=""
                    style={{ width: "100%", height: "250px" }}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%" }}
                    height={250}
                  />
                )} */}
          <LazyLoadImage
            src={product?.img_urn}
            style={{ width: "100%", height: "250px" }}
            alt="Image Alt"
            placeholder={
              <Skeleton variant="rectangular" width="100%" height={250} /> // Skeleton placeholder
            }
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
          <div className="productNameOnHover">{product.product_title}</div>

          <div className="rate" style={{ display: "flex", gap: "10px" }}>
            <Rating
              sx={{ fontSize: "20px" }}
              name="read-only"
              value={product?.rating}
              precision={0.1}
              readOnly
            />
          </div>
          <div
            className="price"
            style={{
              color: designVar.colors.iconTextColor,
              display: "flex",
              justifyContent: "flex-start",
              gap: "5px",
              alignItems: "flex-end",
              marginTop: "5px",
            }}
          >
            <h4 style={{ display: "flex", alignItems: "flex-end" }}>
              {product?.currecy_type === "INR" ? "₹ " : "$ "}
              {product.current_price}.00{" "}
            </h4>
            <p
              style={{
                textDecoration: "line-through",
                color: "black",
                fontSize: "12px",
              }}
            >
              {product?.mrp && (
                <>
                  {" "}
                  {product?.currecy_type === "INR" ? "₹ " : "$ "}
                  {product?.mrp}
                </>
              )}
            </p>

            {product?.website === "amazon" ? (
              <i
                className="fa-brands fa-amazon"
                style={{ position: "absolute", right: 10 }}
              ></i>
            ) : (
              <img
                src={productImgLinks[product?.website]}
                style={{
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  right: 10,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShopBoxSkel = () => {
  return (
    <div className="box" style={{ width: "90%", height: "100%" }}>
      <div className="product mtop">
        <div className="img">
          <Skeleton variant="rectangular" width="100%" height={250} />
        </div>
        <div className="product-details">
          <div className="productNameOnHover" style={{ marginTop: "2px" }}>
            <Skeleton variant="rectangular" width="100%" height={40} />
          </div>

          <div className="rate">
            <Skeleton variant="rectangular" width="50%" height={25} />
          </div>
          <div
            className="price"
            style={{ color: designVar.colors.iconTextColor }}
          >
            <Skeleton variant="rectangular" width="50%" height={25} />
            <Skeleton variant="rectangular" width="10%" height={25} />
          </div>
        </div>
      </div>
    </div>
  );
};
