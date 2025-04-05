/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Props {
  label: string;
  isNamed: boolean;
  checked?: boolean;
  element?: any;
  onChange?: any;
}

export default function CheckBox({
  label,
  isNamed,
  checked,
  element,
  onChange,
}: Props) {

  const handleClick = () => {
    onChange(element);
  };

  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <div
          id={`checkbox-${label}`}
          className="bg-secondary flex justify-center items-center w-5 h-5 rounded-full"
        >
          <div className="bg-primary w-3 h-3 rounded-full"></div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          id={`checkbox-${label}`}
          className="bg-secondary w-5 h-5 rounded-full"
        />
      )}
      {isNamed ? (
        <label htmlFor={`checkbox-${label}`}>
          <div className="flex flex-col">
            <h4 className=" font-medium">Дом</h4>
            <p className="text-[#677E8B] text-sm font-medium">{label}</p>
          </div>
        </label>
      ) : (
        <label onClick={handleClick} htmlFor={`checkbox-${label}`}>
          {label}
        </label>
      )}
    </div>
  );
}
