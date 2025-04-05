"use client";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Button from "@/components/ui/Button";
import GreySpace from "@/components/ui/GreySpace";
import { getAppData } from "@/utils/getAppData";
import { getLocalizedText } from "@/utils/getLocaleText";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export async function generateMetadata(props) {
  const { params } = await props;
  const { locale } = await params;

  const data = getAppData();
  if (!data) {
    return notFound();
  }
  const currentPage = (await data).pages.find((el) => el.url == "payment");
  const title = getLocalizedText(currentPage, "title", locale);

  return {
    title,
  };
}

export default function OrderRecived() {
  const t = useTranslations();
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/order-recived",
      label: t("orderproccessing"),
    },
  ];
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const paymentUrl = searchParams.get("paymentUrl");

  const handlePayment = () => {
    window.location.href = paymentUrl;
  };
  const handleHome = () => {
    router.push("/");
  };

  console.log({ id, paymentUrl });
  return (
    <div className="container mx-auto px-5">
      <Breadcrumbs items={breadcrumbs} />

      <div className="w-full mb-[120px] flex justify-center items-center">
        <GreySpace className="max-w-[44rem] w-full p-12 flex justify-center items-center">
          <div className="flex flex-col gap-8 items-center w-full">
            <Image src={"/footerLogo.svg"} height={85} width={120} alt="" />
            <div className="flex flex-col items-center justify-center">
              <h4 className="font-medium text-lg text-center max-w-[15rem] w-full">
                Ваш заказ успешно принят! Номер заказа: <span>{id}</span>
              </h4>
              <p className="text-[#677E8B] text-center max-w-[21rem] w-full">
                Оператор свяжется с вами для консультации в ближайшее время
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-5">
              {paymentUrl && (
                <Button
                  onClick={handlePayment}
                  className="bg-primary text-white py-4 flex justify-center items-center max-w-[14rem] w-full"
                  text="К оплате"
                />
              )}
              <Button
                onClick={handleHome}
                className="bg-white text-black py-4 flex justify-center items-center max-w-[14rem] w-full"
                text="На главную"
              />
            </div>
          </div>
        </GreySpace>
      </div>
    </div>
  );
}
