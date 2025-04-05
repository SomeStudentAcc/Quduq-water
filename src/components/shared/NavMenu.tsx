import Image from "next/image";
import React from "react";

export default function NavMenu() {
  return (
    <>
      <button className=" bg-secondary flex-shrink-0 p-3 rounded-full">
        <Image src={"/List.svg"} width={24} height={24} alt="burger" />
      </button>
    </>
  );
}
