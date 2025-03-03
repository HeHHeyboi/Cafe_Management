// src/app/components/Hero/Hero.js

"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

function Hero() { // Changed to PascalCase
  const images = [
    "public/Logo.png", // Replace with your actual image paths
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="mySwiper mt-8" // Optional: for custom styling
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            width={500} // Adjust as needed
            height={300} // Adjust as needed
            className="object-cover w-full rounded-md"
            layout="responsive"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Hero;