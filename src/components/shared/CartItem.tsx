"use client";
import { useCart } from "@/stores/cart";
import { IProduct } from "@/types/getDataTypes";
import { formatPrice } from "@/utils/formatPrice";
import { getUrl } from "@/utils/gerUrl";
import { getLocalizedText } from "@/utils/getLocaleText";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface Props {
  isCart: boolean;
  item: IProduct;
}

export default function CartItem({ isCart, item }: Props) {
  const t = useTranslations()
  const locale = useLocale()
  const { increaseQuantity, decreaseQuantity, deleteFromCart } = useCart();

  return (
    <>
      <div className=" flex justify-between  relative">
        <div className="p-1 md:p-2 border-[#F0F2F6] border rounded-[1rem] mr-2 ">
          <Image
            className=" object-contain w-[110px] h-[110px]  md:w-[120px] md:h-[120px]"
            src={getUrl(item.image, "products")}
            height={2000}
            width={2000}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="font-medium">{getLocalizedText(item, 'name', locale)}</h4>
          <h3 className="font-medium hidden md:block text-xl">
            {formatPrice(item?.price || item?.product_price || 0)} <span>{t('sum')}</span>
          </h3>
        </div>
        <div className="hidden md:flex flex-col justify-center  max-w-[10rem] w-full">
          <div className="w-full border-primary border rounded-[3.1rem] overflow-hidden  flex items-center justify-between">
            <button
              onClick={() => {
                decreaseQuantity(item.id);
              }}
              className=" py-2 pl-6 font-bold"
            >
              -
            </button>
            <span className="py-2">{item.amount || item?.product_count}</span>
            <button
              onClick={() => {
                increaseQuantity(item.id);
              }}
              className=" py-2 pr-6"
            >
              +
            </button>
          </div>
        </div>
        <div
          className={`${
            isCart ? "flex items-start  md:mr-5" : "absolute top-0 right-0"
          }`}
        >
          <Image
            onClick={() => deleteFromCart(item.id)}
            className=""
            src={"/X.svg"}
            height={16}
            width={16}
            alt=""
          />
        </div>
      </div>
      <div className="flex items-center md:hidden justify-between">
        <h3 className="font-medium text-base">
          {item.price} <span>{t('sum')}</span>
        </h3>

        <div className="flex flex-col justify-center  max-w-[10rem] w-full">
          <div className="w-full border-primary border rounded-[3.1rem] overflow-hidden  flex items-center justify-between">
            <button
              onClick={() => {
                decreaseQuantity(item.id);
              }}
              className=" py-2 pl-6 font-bold"
            >
              -
            </button>
            <span className="py-2">{item.amount}</span>
            <button
              onClick={() => {
                increaseQuantity(item.id);
              }}
              className=" py-2 pr-6"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
