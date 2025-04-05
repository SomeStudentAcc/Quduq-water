"use client";
import "@/assets/banner.css";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ISlider } from "@/types/getDataTypes";
import { getUrl } from "@/utils/gerUrl";

interface Props {
  sliders: ISlider[];
}

export default function Banner({ sliders }: Props) {

  return (
    <div className="container mx-auto px-5 lg:px-5 mb-[7.5rem] relative mt-14">
      <Swiper
        className="banner"
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Navigation, Pagination]}
        effect="fade"
      >
        {sliders.map((slide) => {
          const img = getUrl(slide.image, "sliders");
          return (
            <SwiperSlide key={`slide${slide.id}`} className="select-none">
              <Image
                className="w-full h-auto min-h-[375px] rounded-[30px] object-cover"
                src={img}
                width={2000}
                height={2000}
                alt={slide.name || ""}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
