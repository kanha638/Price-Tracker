import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { HeaderBox } from "./HeaderBox";

const HeadSliderCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          lazyLoad: "ondemand",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
        <HeaderBox img="https://m.media-amazon.com/images/I/41b3PmlPPuL._SX300_SY300_QL70_FMwebp_.jpg" />
        <HeaderBox img="https://m.media-amazon.com/images/I/71hDrHwTsVL._SX679_PIbundle-6,TopRight,0,0_AA679SH20_.jpg" />
        <HeaderBox img="https://m.media-amazon.com/images/I/61S9aVnRZDL._SX679_.jpg" />
      </Slider>
    </>
  );
};

export default HeadSliderCard;