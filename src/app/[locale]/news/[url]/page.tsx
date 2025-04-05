import axiosInstance from "@/axios";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { IGetData, INews } from "@/types/getDataTypes";
import { formatTextlength } from "@/utils/formatTextLength";
import { getUrl } from "@/utils/gerUrl";
import { getLocalizedText } from "@/utils/getLocaleText";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

interface Params {
  product: string;
}

export async function generateMetadata() {
  const t = await getTranslations();

  const title = t("nav.news");

  return {
    title,
  };
}

export default async function NewsSingle({ params }: { params: Params }) {
  const { url } = params;
  const res = await axiosInstance.get("/data", {
    params: {
      system: "Web",
    },
  });
  const data: IGetData = res.data;

  const promotion: INews = data.news.find((el) => el.url == url);
  const t = await getTranslations();
  const locale = await getLocale()
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/news",
      label: t("orderproccessing"),
    },
    {
      url: `/news/${promotion.url}`,
      label: formatTextlength(getLocalizedText(promotion, 'title', locale), 30),
    },
  ];

  return (
    <div className="container mx-auto px-5">
      <Breadcrumbs items={breadcrumbs} />
      <div className="w-full  flex items-center justify-center    mb-[120px]">
        <div className="flex-col max-w-[940px] w-full flex gap-12">
          <h2 className="font-semibold text-4xl">{getLocalizedText(promotion, 'title', locale)}</h2>
          <Image
            src={getUrl(promotion.image, "news")}
            width={940}
            height={350}
            alt=""
          />
          <p className="font-medium text-[#677E8B]">{getLocalizedText(promotion, 'text', locale)}</p>
        </div>
      </div>
    </div>
  );
}
