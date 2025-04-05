"use client";
import axiosInstance from "@/axios";
import React, { useEffect } from "react";
import OrderInputs from "./OrderInputs";
import OrderDetailCart from "./OrderDetailCart";
import { OrderResponse } from "@/types/getOrderDetailTypes";

interface Props {
  id: string;
}

export default function OrderDetail({ id }: Props) {
  const [user, setUserData] = React.useState<{ client?: { id?: number } }>({});
  const [orderData, setOrder] = React.useState<OrderResponse>({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const getOrder = async () => {
      try {
        if (user.client?.id) {
          const response = await axiosInstance(
            `/get-order-detail?id=${user.client?.id}&order_id=135268&system=Web`
          );
          console.log(response.data);
          setOrder(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, [user]);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-between gap-5">
      <OrderInputs orderData={orderData} id={id} />
      <div className="lg:max-w-[580px] w-full">
        <OrderDetailCart orderData={orderData} />
      </div>
    </div>
  );
}
