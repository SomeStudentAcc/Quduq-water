/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import GreySpace from "../ui/GreySpace";
import { IProduct } from "@/types/getDataTypes";
import CartItem from "./CartItem";
import { useCart } from "@/stores/cart";
import { formatPrice } from "@/utils/formatPrice";
import { useHeaderStore } from "@/stores/headerStore";
import { OrderResponse } from "@/types/getOrderDetailTypes";
import { useTranslations } from "next-intl";

interface Props {
  orderData: OrderResponse;
}

export default function OrderDetailCart({ orderData }: Props) {
  const t = useTranslations();
  const [state, setState] = useState();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderCart, setOrderCart] = useState<IProduct[]>([]);
  const { cart, allProds } = useCart();
  const { appData } = useHeaderStore();

  useEffect(() => {
    if (orderData) {
      const arr = allProds.filter((prod) =>
        orderData.items.map((el) =>
          prod.id == el.product_id ? { ...prod, amount: el.product_count } : ""
        )
      );
      setOrderCart(arr);
    }
  }, [allProds, orderData]);

  useEffect(() => {
    console.log(orderCart);
  }, [orderCart]);

  console.log(appData);
  console.log(orderCart);

  useEffect(() => {
    setState(orderData?.order?.state);
    console.log(orderData?.order?.state);
  }, [orderData]);

  const delivery = 50000;
  const myCart = cart.map((item) => {
    const product = allProds.find(
      (prod: IProduct) => prod.id.toString() == item.id.toString()
    );
    return { ...product, amount: item.amount };
  });
  return (
    <div className="w-full ">
      <GreySpace className="lg:max-w-[580px] w-full" title="Ваш заказ">
        <div className="pb-7">
          {myCart.map((item: IProduct) => (
            <CartItem isCart={false} key={item.id} item={item} />
          ))}
        </div>
        <div className="border-dashed  pt-5 border-t-[4px]">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-medium text-lg text-[#677E8B]">
              Стоимость доставки:
            </h4>
            <h4 className="font-medium text-lg ">
              50 000 <span>сум</span>
            </h4>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-medium text-lg text-[#677E8B]">
              {t("totalCost")}
            </h4>
            <h4 className="font-medium text-lg ">
              {formatPrice(totalPrice)} <span>{t("sum")}</span>
            </h4>
          </div>
          {state == 1 || 2 ? (
            <Button
              text={t("cancelOrder")}
              className="bg-primary text-white w-full flex items-center justify-center p-4"
            />
          ) : (
            <p>
              Для связи с оператором, звоните по номеру:{" "}
              <span>+99895 000 30 03</span>
            </p>
          )}
        </div>
      </GreySpace>
    </div>
  );
}
