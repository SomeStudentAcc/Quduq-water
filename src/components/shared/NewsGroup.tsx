"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "@/assets/newsCard.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Button from "../ui/Button";
import { INews } from "@/types/getDataTypes";
import { getUrl } from "@/utils/gerUrl";
import { formatTextlength } from "@/utils/formatTextLength";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getLocalizedText } from "@/utils/getLocaleText";

interface Props {
  news: INews[];
}

export default function NewsGroup({ news }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="container mx-auto px-5 mb-12 lg:mb-[7.5rem] relative">
      <h2 className="font-semibold text-4xl mb-12">{t("nav.news")}</h2>
      <div className="second-swiper">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },

            0: {
              slidesPerView: 1,
            },
          }}
          modules={[Navigation]}
          className="card news-swiper"
        >
          {news.map((el) => (
            <SwiperSlide
              key={el.id}
              className="max-w-[29rem] w-full select-none border-[2px] border-secondary"
            >
              <Link href={`/news/${el.url}`}>
                <div className="flex flex-col gap-5 p-5">
                  <Image
                    className="w-full h-auto"
                    src={getUrl(el.image, "news")}
                    width={1200}
                    height={500}
                    alt={""}
                  />
                  <div className="">
                    <h4 className="mb-2">{getLocalizedText(el, "title", locale)}</h4>
                    <p className="text-[#677E8B]">
                      {formatTextlength(
                        getLocalizedText(el, "text", locale),
                        130
                      )}
                    </p>
                  </div>
                  <Button
                    className="max-w-[13.5rem] w-full hover:bg-primary hover:text-white transition-colors duration-200  bg-secondary py-3"
                    text={t('more')}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>{" "}
      </div>
    </div>
  );
}
