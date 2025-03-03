"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      <div><h3>🍎 Apple</h3></div>
      <div><h3>🍌 Banana</h3></div>
      <div><h3>🍒 Cherry</h3></div>
      <div><h3>🍇 Grape</h3></div>
      <div><h3>🍉 Watermelon</h3></div>
    </Slider>
  );
};

export default Carousel;
