import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { getAppData } from "@/utils/getAppData";
import { getLocalizedText } from "@/utils/getLocaleText";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 600;

export async function generateMetadata(props) {
  const { params } = await props;
  const { locale } = await params;

  const data = getAppData();
  if (!data) {
    return notFound();
  }
  const currentPage = (await data).pages.find((el) => el.url == "about");
  const title = getLocalizedText(currentPage, "title", locale);

  return {
    title,
  };
}

export default async function AboutUs() {
  const t = await getTranslations();
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/aboutUs",
      label: t("nav.aboutUs"),
    },
  ];

  return (
    <section className="container mx-auto px-5">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex  justify-center items-center mb-[120px]">
        <div className="flex max-w-[940px] w-full flex-col gap-5  ">
          <h2 className="font-semibold text-4xl mb-12">О нас</h2>
          <div className=" flex">
            <Image src={"/aboutUs.svg"} width={940} height={450} alt="" />
          </div>
          <p className="font-medium text-[#677E8B]">
            Господа, разбавленное изрядной долей эмпатии, рациональное мышление
            предоставляет широкие возможности для распределения внутренних
            резервов и ресурсов. Для современного мира высокотехнологичная
            концепция общественного уклада позволяет выполнить важные задания по
            разработке существующих финансовых и административных условий. Как
            принято считать, ключевые особенности структуры проекта могут быть
            объединены в целые кластеры себе подобных. Безусловно, базовый
            вектор развития создаёт предпосылки для благоприятных перспектив.
            Однозначно, некоторые особенности внутренней политики рассмотрены
            исключительно в разрезе маркетинговых и финансовых предпосылок.
            Высокий уровень вовлечения представителей целевой аудитории является
            четким доказательством простого факта: внедрение современных методик
            напрямую зависит от соответствующих условий активизации. Сложно
            сказать, почему элементы политического процесса, инициированные
            исключительно синтетически, функционально разнесены на независимые
            элементы. С учётом сложившейся международной обстановки, новая
            модель организационной деятельности прекрасно подходит для
            реализации новых принципов формирования материально-технической и
            кадровой базы. Приятно, граждане, наблюдать, как некоторые
            особенности внутренней политики обнародованы. В частности,
            перспективное планирование прекрасно подходит для реализации
            прогресса профессионального сообщества.
          </p>
        </div>
      </div>
    </section>
  );
}
