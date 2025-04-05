"use client";
import React, { useEffect, useState } from "react";
import GreySpace from "../ui/GreySpace";
import axiosInstance from "@/axios";
import { useRouter } from "next/navigation";

export default function OrdersTable() {
    const router = useRouter()
  const [orders, setOrders] = useState();
  const [user, setUserData] = React.useState<{ client?: { id?: number } }>({});

  const arr = [1, 2, 3];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    try {
      const getOrders = async () => {
        const response = await axiosInstance.get(
          `/get-orders?id=${user.client?.id}&system=Web`
        );
        console.log(response.data);
      };
      if (user.client?.id) {
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  return (
    <GreySpace className="max-w-[940px] w-full" title="Заказы">
      <div className="bg-white hidden lg:block overflow-hidden p-4 rounded-[1rem]">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-4 text-left">Номер заказа</th>
              <th className="py-4 text-left">Статус</th>
              <th className="py-4 text-left">Время и дата</th>
              <th className="py-4 text-left">Сумма</th>
              <th className="py-4 text-left">Подробнее</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((el, index) => (
              <tr
                key={index}
                className={`border-b text-[#677E8B] font-medium ${
                  index === arr.length - 1 ? "border-none" : ""
                }`}
              >
                <td className="py-4 text-left">548648</td>
                <td className="py-4  text-left">Открыт</td>
                <td className="py-4  text-left">13.03.2024 (12:58)</td>
                <td className="py-4  text-left">1 150 000 сум</td>
                <td onClick={()=> router.push(`/orderStatus/135268`)} className="py-4 cursor-pointer  text-left">К заказу</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" flex flex-col gap-3 lg:hidden overflow-hidden ">
        {arr.map((el, index) => (
          <div className="bg-white px-4 rounded-[1rem]" key={index}>
            <div className="py-4 border-b flex justify-between items-center">
              <p className="font-medium text-sm">Номер заказа</p>
              <p className="text-[#677E8B] font-medium text-sm">548648</p>
            </div>
            <div className="py-4 border-b flex justify-between items-center">
              <p className="font-medium text-sm">Статус</p>
              <p className="text-[#677E8B] font-medium text-sm">Открыт</p>
            </div>
            <div className="py-4 border-b flex justify-between items-center">
              <p className="font-medium text-sm">Время и дата</p>
              <p className="text-[#677E8B] font-medium text-sm">
                13.03.2024 (12:58)
              </p>
            </div>
            <div className="py-4 border-b flex justify-between items-center">
              <p className="font-medium text-sm">Сумма</p>
              <p className="text-[#677E8B] font-medium text-sm">
                1 150 000 сум
              </p>
            </div>
            <div className="py-4 border-b flex justify-between items-center">
              <p className="font-medium text-sm">Подробнее</p>
              <p onClick={()=> router.push(`/orderStatus/135268`)} className="text-[#677E8B] font-medium text-sm cursor-pointer">К заказу</p>
            </div>
          </div>
        ))}
      </div>
    </GreySpace>
  );
}
