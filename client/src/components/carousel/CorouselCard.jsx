import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { designVar } from "../../common/data";
import './../../styles/style.css';
import { Link } from "react-router-dom";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};
const CorouselCard = ({ productItems, number_of_slides = 4 }) => {
  const [liked, setLiked] = useState(false);
  const change = () => {
    setLiked((val) => !val);
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: number_of_slides,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 2,
    initialSlide: 0,
    lazyLoad: "ondemand",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          lazyLoad: "ondemand",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          lazyLoad: "ondemand",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          lazyLoad: "ondemand",
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {productItems.map((productItems) => {
          return (
            <div className="box">
              <div
                className="product mtop"
                style={{ width: "90%", height: "100%" }}
              >
                <div
                  className="img"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <span
                    className="discount"
                    style={{
                      backgroundColor: designVar.colors.iconBackgroundColor,
                    }}
                  >
                    {productItems.discount}% Off
                  </span>
                  <img
                    style={{
                      maxWidth: "250px",
                      maxHeight: "300px",
                      width: "100%",
                    }}
                    src={productItems.cover}
                    alt=""
                    loading="lazy"
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
                <Link to={`/product/${productItems.id}`}>
                   <div className="productNameOnHover">{productItems.name}</div>
                </Link>
                  
                  {/* <h3>{productItems.name}</h3> */}
                  
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
                    <h4>${productItems.price}.00 </h4>

                    <p
                      // style={{ cursor: "pointer" }}
                      style={{ color: designVar.colors.iconTextColor,cursor: "pointer"  }}
                    >
                      Track
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default CorouselCard;
