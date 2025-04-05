/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import GreySpace from "../ui/GreySpace";
import CartItem from "./CartItem";
import { IProduct } from "@/types/getDataTypes";
import { useCart } from "@/stores/cart";
import Button from "../ui/Button";
import { formatPrice } from "@/utils/formatPrice";
import { useCheckoutStore } from "@/stores/checkoutStore";
import axiosInstance from "@/axios";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export interface ResponseData {
  id: number;
  paymentUrl: string;
}

export default function CheckoutCart() {
  const t = useTranslations()
  const router = useRouter();
  const { cart, allProds } = useCart();
  const {
    name,
    phoneNumber,
    comment,
    checkedVal,
    selectedPayment,
    addresses,
    user,
    setUser,
  } = useCheckoutStore();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const delivery = 50000;
  const myCart = cart.map((item) => {
    const product = allProds.find(
      (prod: IProduct) => prod.id.toString() == item.id.toString()
    );
    return { ...product, amount: item.amount };
  });

  useEffect(() => {
    const prods = myCart.reduce((acc, el) => acc + el.price * el.amount, 0);
    setTotalPrice(prods + delivery);
  }, [myCart]);

  const handlePush = (data: ResponseData) => {
    router.push(
      `/order-recived?id=${data.id.toString()}${data.paymentUrl.trim().length > 0 ? `&paymentUrl=${data.paymentUrl.toString()}`: ''}`
    );
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("system", "Web");
      formData.append("id", user.client?.id);
      formData.append("region_id", checkedVal?.id);
      formData.append("type", "1");
      formData.append("name", name);
      formData.append("phone", phoneNumber);
      formData.append("address_id", checkedVal?.id);
      formData.append("street", checkedVal?.street);
      formData.append("home", checkedVal?.entrance);
      formData.append("payment", selectedPayment);
      formData.append("comment", comment);
      formData.append("items", JSON.stringify(cart));
      const response = await axiosInstance.post("/create-order", formData);
      console.log(response.data);

      if (response.data.success) {
        handlePush(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <GreySpace className="lg:max-w-[580px] w-full" title={t('yourOrder')}>
        <div className="pb-7">
          {myCart.map((item: IProduct) => (
            <CartItem isCart={false} key={item.id} item={item} />
          ))}
        </div>
        <div className="border-dashed  pt-5 border-t-[4px]">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-medium text-lg text-[#677E8B]">
              {t('deliveryCoast')}
            </h4>
            <h4 className="font-medium text-lg ">
              50 000 <span>{t('sum')}</span>
            </h4>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-medium text-lg text-[#677E8B]">{t('totalCost')}</h4>
            <h4 className="font-medium text-lg ">
              {formatPrice(totalPrice)} <span>{t('sum')}</span>
            </h4>
          </div>
          <Button
            onClick={handleSubmit}
            text={t('orderCheckout')}
            className="bg-primary text-white w-full flex items-center justify-center p-4"
          />
        </div>
      </GreySpace>
    </div>
  );
}
