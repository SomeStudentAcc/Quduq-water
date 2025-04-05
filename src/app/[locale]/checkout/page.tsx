import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CheckoutContainer from "@/components/shared/CheckoutContainer";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata() {
  const t = await getTranslations();

  
  const title = t('orderproccessing')

  return {
    title,
  };
}

export default async function Checkout() {
  const t = await getTranslations();
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/checkout",
      label: t("orderproccessing"),
    },
  ];
  return (
    <div className="container mx-auto px-5">
      <Breadcrumbs items={breadcrumbs} />
      <h2 className="font-semibold text-4xl mb-12">{t("orderproccessing")}</h2>
      <div className="w-full mb-[120px]">
        <CheckoutContainer />
      </div>
    </div>
  );
}
