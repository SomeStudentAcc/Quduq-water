'use client'
import { IProduct } from "@/types/getDataTypes";
import { getUrl } from "@/utils/gerUrl";
import { getLocalizedText } from "@/utils/getLocaleText";
import clsx from "clsx";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

interface Props {
  className: string;
  setModalProd: (entity:IProduct)=> void;
  product: IProduct;
  toggleModalProd: (entity: boolean)=> void
}

export default function MenuItem({ className, setModalProd, product, toggleModalProd }: Props) {
  const locale = useLocale()
  const { image } = product;
  return (
    <div
      onClick={() => {
        setModalProd(product)
        toggleModalProd(true)
      }}
      className={clsx(
        "rounded-[12.5rem] group flex items-center gap-5 bg-secondary",
        className
      )}
    >
      <div className="bg-white rounded-[50px] border-secondary flex-shrink-0 w-[80px] h-[80px]   overflow-hidden border group-hover:border-primary">
        <Image
          className=" w-[80px] h-[80px] flex-shrink-0 rounded-[50px] object-contain p-1"
          src={getUrl(image, "products")}
          height={2000}
          width={2000}
          alt=""
        />
      </div>
      <h4 className="font-medium group-hover:text-primary">{getLocalizedText(product, 'name', locale)}</h4>
    </div>
  );
}
