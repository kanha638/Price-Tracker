import React, { useState, useEffect } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const dataArray = [
    "https://m.media-amazon.com/images/I/41b3PmlPPuL._SX300_SY300_QL70_FMwebp_.jpg",
    "https://m.media-amazon.com/images/I/61utX8kBDlL._UY695_.jpg",
    "https://m.media-amazon.com/images/I/61S9aVnRZDL._SX679_.jpg",
  ];

  const descriptons = [
    "ASIAN Men's Wonder-13 Sports Running Shoes",
    "ASIAN Men's Wonder-13 Sports Running Shoes",
    "ASIAN Men's Wonder-13 Sports Running Shoes"
  ]

  const discount = [
    "61",
    "22",
    "50"
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dataArray.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Slider {...settings}>
        <HeaderBox img={dataArray[currentIndex]} disc={discount[currentIndex]} description ={descriptons[currentIndex]} />
      </Slider>
    </>
  );
};

export default HeadSliderCard;
