import { getUrl } from "@/utils/gerUrl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { IProduct } from "@/types/getDataTypes";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/stores/cart";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedText } from "@/utils/getLocaleText";

interface Props {
  toggleModalProd: (entity: boolean) => void;
  modalProd: IProduct;
}

export default function ProductModal({ toggleModalProd, modalProd }: Props) {
  const t = useTranslations()
  const locale = useLocale()
  const [amount, setAmmount]= useState(0)
  const { name, image, price } = modalProd;
  const { cart, allProds } = useCart();
  const { increaseQuantity, decreaseQuantity, addToCart } = useCart();

  const prod = allProds.find((el) => el.id == modalProd.id);
  if (prod) {
    const cartItem = cart.find(
      (el) => el.id.toString() === modalProd.id.toString()
    );
    if (cartItem) {
      prod.amount = cartItem.amount;
    }
  }

  useEffect(()=> {
    setAmmount(prod.amount)
  },[prod])

  console.log(prod);
  console.log(amount);
  

  return (
    <>
      <div className="flex flex-col md:flex-row relative gap-10 md:gap-12 md:items-center">
        <div className="p-1 md:p-2 border-[#F0F2F6] border w-fit rounded-[1rem] mr-2 ">
          <Image
            className=" object-contain w-[210px] h-[210px]  md:w-[380px] md:h-[380px]"
            src={getUrl(image, "products")}
            height={2000}
            width={2000}
            alt=""
          />
        </div>
        <div className="flex w-full md:w-fit flex-1 flex-col gap-4 md:gap-8">
          <p className="font-medium">{getLocalizedText(modalProd, 'name', locale)}</p>
          <h4 className="font-medium text-xl">
            {formatPrice(price)} <span>{t('sum')}</span>
          </h4>
          {amount > 0 ? (
            <div className="max-w-[13.5rem] w-full  border-primary border rounded-[3.1rem] overflow-hidden  flex items-center justify-between">
              <button
                onClick={() => {
                  decreaseQuantity(prod.id);
                  setAmmount(amount-1)
                }}
                className=" py-2 pl-6 font-bold"
              >
                -
              </button>
              <span className="py-2">{prod.amount}</span>
              <button
                onClick={() => {
                  increaseQuantity(prod.id);
                  setAmmount(amount+1)
                }}
                className=" py-2 pr-6"
              >
                +
              </button>
            </div>
          ) : (
            <Button
              onClick={() => {
                addToCart(prod.id);
                setAmmount(1)
              }}
              className="max-w-[13.5rem] w-full py-3 bg-[#F7F8FA] hover:bg-primary hover:text-white transition-colors duration-150"
              text={t('inCart')}
            />
          )}
        </div>
        <div
          onClick={() => toggleModalProd(false)}
          className="bg-secondary rounded-full p-3 absolute top-0 right-0"
        >
          <Image src={"/closeBlue.svg"} width={18} height={18} alt="" />
        </div>
      </div>
    </>
  );
}
