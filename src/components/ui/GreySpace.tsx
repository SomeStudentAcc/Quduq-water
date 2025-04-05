import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  className?: string;
  title?: string;
  children: ReactNode;
}

export default function GreySpace({ className, title, children }: Props) {
  return (
    <div className={clsx("bg-secondary p-5 rounded-[20px]", className)}>
      {title && (
        <h3 className="font-semibold text-primary text-xl mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}
