/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import Button from "../ui/Button";
import Image from "next/image";
import { getUrl } from "@/utils/gerUrl";
import { useLocale, useTranslations } from "next-intl";
import { IProduct } from "@/types/getDataTypes";
import { useCart } from "@/stores/cart";
import { getLocalizedText } from "@/utils/getLocaleText";

interface Props {
  name: string;
  price: number;
  image: string;
  prod: IProduct;
  id: number;
}

export default function MobProdCard({ name, price, image, prod, id }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const { allProds, addToCart, cart, increaseQuantity, decreaseQuantity } =
    useCart();

  const singleProd = cart.find((item) => item.id.toString() === id.toString());
  return (
    <div className={`bg-white flex flex-col border-[#F0F2F6] border p-5 `}>
      <div className="flex justify-center  mb-10">
        <Image
          className={"w-[200px] h-[200px]  flex-shrink-0 object-contain"}
          src={getUrl(image, "products")}
          height={211}
          width={211}
          alt=""
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <h4 className="font-medium">
          {getLocalizedText(prod, "name", locale)}
        </h4>
        <p className="font-medium text-xl">
          {price} <span>{t("sum")}</span>
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
            text={t("inCart")}
          />
        )}
      </div>
    </div>
  );
}
