import React, { useEffect, useState } from "react";
import GreySpace from "../ui/GreySpace";
import { CircleCheck, Clock, Flag, Truck } from "lucide-react";
import Input from "../ui/Input";
import CheckBox from "../ui/CheckBox";
import { OrderResponse } from "@/types/getOrderDetailTypes";
import { useHeaderStore } from "@/stores/headerStore";
import { useTranslations } from "next-intl";

interface Props {
  id: string;
  orderData: OrderResponse;
}

export default function OrderInputs({ id, orderData }: Props) {
  const [state, setState] = useState();
  const [stateText, setStateText] = useState("");
  const { appData } = useHeaderStore();
  const t = useTranslations();
  console.log(appData);
  useEffect(() => {
    setState(orderData?.order?.state);
    console.log(orderData?.order?.state);
  }, [orderData]);

  useEffect(() => {
    const findValueByKey = (
      obj: Record<string | number, string>,
      key: string | number
    ): string | undefined => {
      for (const objKey in obj) {
        if (objKey == key) {
          setStateText(obj[objKey]);
        }
      }
      return "";
    };
    findValueByKey(appData.statuses, state!);
  }, [state, appData]);

  return (
    <div className="max-w-[700px] w-full flex flex-col gap-5">
      <GreySpace className="flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-primary font-semibold text-xl">
            Заказ номер {id}
          </h2>
          <p className="text-[#677E8B] font-medium">{stateText}</p>
        </div>
        <div className="flex w-full justify-between items-center relative">
          <div className="h-[6px] bg-white w-full absolute ">
            <span
              className={`absolute h-full ${
                state === 2
                  ? "w-0"
                  : state === 3
                  ? "w-1/3"
                  : state === 4
                  ? "w-2/3"
                  : state === 5
                  ? "w-[99%]"
                  : ""
              } bg-primary`}
            ></span>
          </div>
          <div className="rounded-full flex items-center justify-center h-[70px] w-[70px] p-6 bg-primary z-10">
            <CircleCheck className="text-white" size={18} />
          </div>
          <div className="rounded-full flex items-center justify-center h-[70px] w-[70px] p-6 bg-primary z-10">
            <Clock className="text-white" size={18} />
          </div>
          <div className="rounded-full flex items-center justify-center h-[70px] w-[70px] p-6 bg-primary z-10">
            <Truck className="text-white" size={18} />
          </div>
          <div className="rounded-full flex items-center justify-center h-[70px] w-[70px] p-6 bg-primary z-10">
            <Flag className="text-white" size={18} />
          </div>
        </div>
      </GreySpace>
      <GreySpace className="" title={t("yourData")}>
        <div className="flex justify-between gap-5">
          <Input getter="Петров Никита" placeHolder={t("yourName")} />
          <Input getter="Петров Никита" placeHolder={t("number")} />
        </div>
      </GreySpace>
      <GreySpace className="" title={t("deliveryAddress")}>
        <div className="bg-white p-4 rounded-[1rem]">
          <CheckBox
            checked={true}
            label={"Янгихает район, Сергели 3 массив 21"}
            isNamed={false}
          />
        </div>
      </GreySpace>
      <GreySpace className="w-full" title={t("choosePaymentMethod")}>
        <div className="flex flex-wrap lg:flex-row w-full gap-5">
          <div className=" p-4 bg-white rounded-[1rem]">
            <CheckBox checked={true} label={"Наличные"} isNamed={false} />
          </div>
          {/* {Object.entries(data.payments).map(([key, value], index) => (
            <div key={index} className=" p-4 bg-white rounded-[1rem]">
              <CheckBox
                element={key.toString()}
                onChange={setSelectedPayment}
                checked={selectedPayment == key.toString() ? true : false}
                label={value}
                isNamed={false}
              />
            </div>
          ))} */}
        </div>
      </GreySpace>
    </div>
  );
}
