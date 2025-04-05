import Breadcrumbs from "@/components/shared/Breadcrumbs";
import OrderDetail from "@/components/shared/OrderDetail";
import { getTranslations } from "next-intl/server";
import React from "react";

interface Params {
  id: string;
}

export default async function OrderStatus({ params }: { params: Params }) {
  const t = await getTranslations();
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/profile/orders",
      label: t("profile"),
    },
    {
      url: "/profile/orders",
      label: t("orderStatus"),
    },
  ];
  const { id } = await params;
  console.log(id);

  return (
    <div className="container mx-auto px-5">
      <Breadcrumbs items={breadcrumbs} />

      <h2 className="font-semibold text-4xl mb-12">{t("orderStatus")}</h2>
      <div className="w-full mb-[120px]">
        <OrderDetail id={id} />
      </div>
    </div>
  );
}
