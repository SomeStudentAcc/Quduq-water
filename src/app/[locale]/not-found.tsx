import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

export default async function NotFound() {
  const t = await getTranslations();
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/",
      label: "404",
    },
  ];
  return (
    <div className="container mx-auto px-5">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex justify-center items-center flex-col">
        <h1 className="font-semibold text-4xl mb-5">
          <span className="text-primary">Упс</span>, страница не найдена
        </h1>
        <Image className="mb-12" src={"/404.svg"} width={700} height={354} alt="" />
        <Link className="max-w-[29rem] w-full mb-[7rem]" href={"/"}>
          <Button
            text="На главную"
            className="py-4 max-w-[29rem] flex items-center justify-center w-full bg-secondary"
          />
        </Link>
      </div>
    </div>
  );
}
