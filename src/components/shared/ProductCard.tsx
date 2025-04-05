/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import clsx from "clsx";
import { getUrl } from "@/utils/gerUrl";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/stores/cart";
import { getLocalizedText } from "@/utils/getLocaleText";
import { IProduct } from "@/types/getDataTypes";
import { useLocale, useTranslations } from "next-intl";

interface Props {
  index: number;
  name: string;
  price: number;
  image: string;
  id: number;
  prod: IProduct
}

export default function ProductCard({ index, name, price, image, id, prod }: Props) {
  const t = useTranslations()
  const locale = useLocale()
  const { allProds, addToCart, cart, increaseQuantity, decreaseQuantity } =
    useCart();
    

  const singleProd = cart.find((item) => item.id.toString() === id.toString());
  

  return (
    <div
      className={`bg-white flex items-center border-[#F0F2F6] border  justify-between p-5 ${
        index < 2 ? "col-span-3" : "col-span-2"
      }`}
    >
      <div className="flex w-full flex-col gap-7">
        <h4 className="font-medium max-w-[11rem] w-full">{getLocalizedText(prod, 'name', locale)}</h4>
        <p className="font-medium text-xl">
          {formatPrice(price)} <span>{t('sum')}</span>
        </p>
        {singleProd?.amount || 0 > 0 ? (
          <div className="flex flex-col justify-center  max-w-[10rem] w-full">
            <div className="w-full border-primary border rounded-[3.1rem] overflow-hidden  flex items-center justify-between">
              <button
                onClick={() => {
                  decreaseQuantity(id);
                }}
                className=" py-2 pl-6 font-bold"
              >
                -
              </button>
              <span className="py-2">{singleProd?.amount || 0}</span>
              <button
                onClick={() => {
                  increaseQuantity(id);
                }}
                className=" py-2 pr-6"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => {
              addToCart(id);
            }}
            className="max-w-[13.5rem] w-full py-3 bg-[#F7F8FA] hover:bg-primary hover:text-white transition-colors duration-150"
            text={t('inCart')}
          />
        )}
      </div>
      <div className="w-full">
        <Image
          src={getUrl(image, "products")}
          height={1000}
          width={1000}
          className={clsx(
            index < 2
              ? "w-[250px] h-[250px] xl:w-[360px] xl:h-[360px]"
              : "w-[150px] h-[150px] xl:w-[260px] xl:h-[260px]",
            "object-contain"
          )}
          alt=""
        />
      </div>
    </div>
  );
}
