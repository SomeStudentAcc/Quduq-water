"use client";
import React, { useEffect, useState } from "react";
import Sheet from "../ui/Sheet";
import Button from "../ui/Button";
import Image from "next/image";
import CartItem from "./CartItem";
import { useHeaderStore } from "@/stores/headerStore";
import { useCart } from "@/stores/cart";
import { IProduct } from "@/types/getDataTypes";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";

export default function Cart() {
  const t = useTranslations() 
  const router = useRouter()
  const locale = useLocale()
  const { toggleCart } = useHeaderStore();
  const { cart, allProds } = useCart();
  const [totalPrice, setTotalPrice]= useState(0)
  const arr = cart.map((item) => {
    const product = allProds.find(
      (prod: IProduct) => prod.id.toString() == item.id.toString()
    );
    return { ...product, amount: item.amount };
  });
  console.log(arr);
    useEffect(() => {
      const prods = arr.reduce((acc, el) => acc + el.price * el.amount, 0);
      setTotalPrice(prods);
    }, [arr]);

  if (arr.length == 0) {
    return (
      <Sheet isCart={true}>
        <div className="flex flex-col relative justify-between h-full">
          <div className="h-full p-10">
            <div className="mb-10">
              <div className="flex justify-between">
                <h3 className="font-semibold text-2xl">{t('cart')}</h3>
                <div
                  onClick={() => toggleCart(false)}
                  className="bg-secondary rounded-full p-3"
                >
                  <Image src={"/closeBlue.svg"} width={18} height={18} alt="" />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5 justify-center items-center h-full overflow-y-auto">
              <Image src={"/cartLogo.svg"} width={50} height={50} alt="" />
              <div className="flex flex-col gap-2">
                <h3 className="text-[#677E8B] font-semibold text-center text-2xl">
                 {t('emptyCart')}
                </h3>
                <p className="text-[#677E8B] font-medium text-center max-w-[20rem] w-full">
                  Воспользуйтесь поиском или каталогом, чтобы найти товары
                </p>
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet isCart={true}>
      <div className="flex flex-col relative justify-between h-full">
        <div className="h-full p-10">
          <div className="mb-10">
            <div className="flex justify-between">
              <h3 className="font-semibold text-2xl">{t('cart')}</h3>
              <div
                onClick={() => toggleCart(false)}
                className="bg-secondary rounded-full p-3"
              >
                <Image src={"/closeBlue.svg"} width={18} height={18} alt="" />
              </div>
            </div>
            <p className="text-[#677E8B] font-medium">{t('clearCart')} </p>
          </div>
          <div className="flex-1 flex flex-col gap-5  h-full overflow-y-auto pb-8">
            {arr.map((item: IProduct) => (
              <CartItem  isCart={true} key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="bg-secondary absolute bottom-0 right-0 w-full px-10 py-6 flex gap-5 lg:gap-0 flex-col lg:flex-row justify-between items-center">
          <div className="flex w-full lg:w-fit justify-between lg:justify-start lg:flex-col">
            <p className="font-medium">{t('inTotal')}</p>
            <h4 className="font-semibold text-xl">
              {formatPrice(totalPrice)} <span>{t('sum')}</span>
            </h4>
          </div>
          <Button
          onClick={()=> {
            toggleCart(false)
            router.push(`/${locale}/checkout`)
          }}
            text={t('orderCheckout')}
            className="bg-primary text-white py-4 max-w-[19.5rem] w-full"
          />
        </div>
      </div>
    </Sheet>
  );
}
