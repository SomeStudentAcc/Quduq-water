"use client";
import clsx from "clsx";
import React, { ReactNode, useRef } from "react";
import { useClickAway } from "react-use";

interface Props {
  className?: string;
  children: ReactNode;
  toggler?: (entity:boolean)=> void
  isRounded?: boolean
}

export default function ModalOverlay({ className,toggler, children, isRounded }: Props) {
  const ref = useRef(null);

  useClickAway(
    ref,
    () => {
      toggler(false);
      console.log("overlay");
    },
    ["click"]
  );
  return (
    <div
      className={`bg-black/50 flex  justify-center items-center fixed top-0 bottom-0 left-0 w-full  h-full no-doc-scroll z-[55]`}
    >
      <div
        ref={ref}
        className={clsx(` bg-white ${isRounded? 'lg:rounded-[1rem] lg:m-5  overflow-y-auto': 'rounded-[1rem] m-5'}`, className)}
      >
        {children}
      </div>
    </div>
  );
}
