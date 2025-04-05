import clsx from "clsx";
import React from "react";

interface Props {
  placeHolder: string;
  setter?:  (value: string) => void
  getter: string;
  className?: string
}

export default function Input({ placeHolder, getter, setter, className }: Props) {
  
  const labelClass = (value: string) =>
    `absolute left-4 top-1/2 ${
      value.trim() ? "top-[10px] text-[#677E8B] text-[12px]" : "text-[#677E8B]"
    } transform -translate-y-1/2 transition-all duration-200`;
  return (
    <div className={clsx("w-full",className)}>
      <div className="relative mb-[22px]">
        <input
          type="text"
          className=" peer w-full border-none outline-none rounded-[1rem] p-4 transition-all duration-200"
          id={getter}
          onChange={(e) => setter?.(e.target.value)}
          value={getter}
        />
        <label className={labelClass(getter)} htmlFor={getter}>
          {placeHolder}
        </label>
      </div>
    </div>
  );
}
