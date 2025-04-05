import Image from "next/image";
import React from "react";

interface Props{
  setAddressMob: React.Dispatch<React.SetStateAction<boolean>>

}

export default function NavMobLocation({setAddressMob}:Props) {
  return (
    <>
      <button className="lg:hidden flex-shrink-0 bg-secondary p-3 rounded-full">
        <Image onClick={()=> setAddressMob(true)} src={"/MapPin.svg"} width={24} height={24} alt="burger" />
      </button>
    </>
  );
}
