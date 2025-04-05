import axiosInstance from "@/axios";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ContactsMap from "@/components/shared/ContactsMap";
import GreySpace from "@/components/ui/GreySpace";
import { IGetData } from "@/types/getDataTypes";
import { getAppData } from "@/utils/getAppData";
import { getLocalizedText } from "@/utils/getLocaleText";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata(props) {
  const { params } = await props;
  const { locale } = await params;

  const data = getAppData();
  if (!data) {
    return notFound();
  }
  const currentPage = (await data).pages.find((el) => el.url == "contacts");
  const title = getLocalizedText(currentPage, "title", locale);

  return {
    title,
  };
}

export default async function Contacts() {
  const t = await getTranslations();
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/contacts",
      label: t("nav.contacts"),
    },
  ];
  const res = await axiosInstance.get("/data", {
    params: {
      system: "Web",
    },
  });
  const data: IGetData = res.data;
  console.log(data);
  return (
    <div className="container mx-auto px-5">
      <Breadcrumbs items={breadcrumbs} />
      <h2 className="font-semibold text-4xl mb-12">{t("nav.contacts")}</h2>
      <div className="w-full mb-[120px]">
        <div className="flex flex-col gap-12 lg:flex-row justify-center items-center lg:items-start lg:justify-between">
          <div className="w-full flex-shrink-0 lg:w-[29rem]  mr-5">
            <GreySpace className="p-12">
              <div className="pb-8 border-b">
                <p className="text-primary font-medium">{t("contactPhone")}</p>
                <h3 className="text-[#677E8B] font-medium text-3xl">
                  {data.call_center_phone}
                </h3>
              </div>
              <div className="py-8 border-b">
                <p className="text-primary font-medium">{t("socials")}</p>
                <div>
                  <div className="flex gap-5">
                    <div className="p-3 bg-white rounded-full">
                      <Image
                        src={"/facebook.svg"}
                        height={20}
                        width={20}
                        alt=""
                      />
                    </div>
                    <div className="p-3 bg-white rounded-full">
                      <Image
                        src={"/instagram.svg"}
                        height={20}
                        width={20}
                        alt=""
                      />
                    </div>
                    <div className="p-3 bg-white rounded-full">
                      <Image
                        src={"/telegram.svg"}
                        height={20}
                        width={20}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-8 border-b">
                <p className="text-primary font-medium">{t("mail")}</p>
                <h3 className="text-[#677E8B] ">quduqgroup@gmail.com</h3>
              </div>
              <div className="pt-8 ">
                <p className="text-primary font-medium">{t("address")}:</p>
                <h3 className="text-[#677E8B] ">
                  Toshkent Shahri, Shayxontohur tumani, Istiroxat kochasi, 41-uy
                </h3>
              </div>
            </GreySpace>
          </div>
          <div className="max-w-[51rem] w-full">
            <ContactsMap />
          </div>
        </div>
      </div>
    </div>
  );
}
