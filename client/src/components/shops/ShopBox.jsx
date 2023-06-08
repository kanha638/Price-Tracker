import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { designVar } from "../../common/data";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../slices/userSlice";
import { likeProduct } from "../../middleware/product";
export const ShopBox = ({ product }) => {
  const userState = useSelector(UserState);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);


  const change = async () => {
    // setLiked((val) => !val);
      
      await  likeProduct(dispatch,setLiked,product?.id);
  
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
          </div>
        </div>
      </div>
    </div>
  );
};
