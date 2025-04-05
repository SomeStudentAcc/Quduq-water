import axiosInstance from "@/axios";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Button from "@/components/ui/Button";
import { IGetData } from "@/types/getDataTypes";
import { formatTextlength } from "@/utils/formatTextLength";
import { getUrl } from "@/utils/gerUrl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateMetadata() {
  const t = await getTranslations();

  const title = t("nav.news");

  return {
    title,
  };
}

export default async function News() {
  const t = await getTranslations();
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/news",
      label: t("nav.news"),
    },
  ];
  const res = await axiosInstance.get("/data", {
    params: {
      system: "Web",
    },
  });
  const data: IGetData = res.data;
  return (
    <div className="container mx-auto px-5">
      <Breadcrumbs items={breadcrumbs} />

      <h2 className="font-semibold text-4xl mb-12">{t("nav.news")}</h2>
      <div className="w-full flex-col items-center justify-center lg:justify-start lg:items-start flex lg:flex-row  gap-5 mb-[120px]">
        {data.news.map((el) => (
          <Link
            href={`news/${el.url}`}
            key={el.id}
            className="max-w-[29rem] w-full select-none border-[2px] border-secondary"
          >
            <div className="flex flex-col gap-5 p-5">
              <Image
                className="w-full h-auto "
                src={getUrl(el.image, "news")}
                width={1200}
                height={400}
                alt={""}
              />
              <div className="">
                <h4 className="mb-2">{el.title_ru}</h4>
                <p className="text-[#677E8B]">
                  {formatTextlength(el.text_ru, 130)}
                </p>
              </div>
              <Button
                className="max-w-[13.5rem] w-full  bg-secondary py-3"
                text={t("more")}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
