"use client ";
import { useHeaderStore } from "@/stores/headerStore";
import clsx from "clsx";
import React, { ReactNode, useRef } from "react";
import { useClickAway } from "react-use";
interface Props {
  children: ReactNode;
  isCart: boolean;
  className?: string;
  index?: string
}

export default function Sheet({ children, isCart, index, className}: Props) {
  const { toggleCart } = useHeaderStore();
  const ref = useRef(null);
  useClickAway(
    ref,
    () => {
      toggleCart(false);
    },
    ["click"]
  );
  return (
    <>
      {isCart ? (
        <div className={clsx(`bg-black/50 fixed top-0 bottom-0 left-0 w-full  h-full z-${index ? index: '30'} ${isCart? 'no-doc-scroll': ''}`, className)}>
          <div
            ref={ref}
            className="h-full  lg:max-w-[44rem] w-full bg-white lg:ml-auto lg:rounded-tl-[1rem] lg:rounded-bl-[1rem]"
          >
            {children}
          </div>
        </div>
      ) : (
        <div className="fixed top-0 bottom-0 left-0 w-full  h-full z-30 no-doc-scroll">
          <div
            ref={ref}
            className="h-full w-full bg-white "
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
