import React from "react";
import CheckoutInputs from "./CheckoutInputs";
import CheckoutCart from "./CheckoutCart";
import axiosInstance from "@/axios";
import { IGetData } from "@/types/getDataTypes";

export default async function CheckoutContainer() {
  const res = await axiosInstance.get("/data", {
    params: {
      system: "Web",
    },
  });
  const data: IGetData = res.data;

  
  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:justify-between">
      <CheckoutInputs data={data} />
      <CheckoutCart />
    </div>
  );
}
