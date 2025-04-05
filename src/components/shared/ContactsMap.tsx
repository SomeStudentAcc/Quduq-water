"use client";
import Image from "next/image";
import React, { useEffect } from "react";

export default function ContactsMap() {
  useEffect(() => {
    const initMap = () => {
      if (typeof window !== "undefined" && window.ymaps) {
        window.ymaps.ready(() => {
          const myMap = new window.ymaps.Map("map2", {
            center: [41.2995, 69.2401],
            zoom: 15,
          });
        });
      }
    };

    initMap();
  }, []);

  return (
    <div
      id="map2"
      className="max-w-[51rem]  w-full relative rounded-[10px] overflow-hidden h-[390px]"
    >
      <Image
        className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src={"/MapPin.svg"}
        height={30}
        width={30}
        alt="pin"
      />
    </div>
  );
}
