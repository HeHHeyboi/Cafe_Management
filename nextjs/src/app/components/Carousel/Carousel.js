"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [
    { src: "/Note.jpg", alt: "Test 1" },
    { src: "/Jaemin.jpg", alt: "Test 2" },
    { src: "/Note.jpg", alt: "Test 3" },
    { src: "/Note.jpg", alt: "Test 4" },
    { src: "/Note.jpg", alt: "Test 5" },
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="carousel-slide">
            <div className="relative w-full h-[31.25vw] max-h-[500px]">
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className="object-cover "
                priority={index === 0} 
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
