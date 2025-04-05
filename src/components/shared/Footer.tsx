import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Footer() {
  const t = await getTranslations();
  return (
    <>
      <div className="bg-secondary">
        <div className=" container py-12 lg:py-24 mx-auto px-5 flex flex-col gap-12 lg:gap-0 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-7 lg:gap-12">
            <Image src={"/footerLogo.svg"} height={176} width={124} alt="" />
            <div className="flex gap-4 lg:gap-5">
              <div className="bg-white py-2 px-3 rounded-[1rem] flex gap-1 items-center">
                <Image src={"/google-play.svg"} height={31} width={31} alt="" />
                <div>
                  <p className="text-xs">{t("downloadIn")}</p>
                  <h4 className="font-medium">Google Play</h4>
                </div>
              </div>
              <div className="bg-white py-2 px-3 rounded-[1rem] flex gap-1 items-center ">
                <Image src={"/apple.svg"} height={31} width={31} alt="" />
                <div>
                  <p className="text-xs">{t("downloadIn")}</p>
                  <h4 className="font-medium">App Store</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:gap-5">
            <h4 className="text-primary font-semibold text-xl">
              {t("aboutCompany")}
            </h4>
            <ul className="flex flex-col  gap-4 lg:gap-5">
              <Link href={"/aboutUs"}>
                <li>{t("nav.aboutUs")}</li>
              </Link>
              <Link href={"/contacts"}>
                <li>{t("nav.contacts")}</li>
              </Link>
              <Link href={"#"}>
                <li>{t("delivery")}</li>
              </Link>
              <Link href={"/news"}>
                <li>{t("nav.news")}</li>
              </Link>
              <Link href={"#"}>
                <li>{t("userPolicy")}</li>
              </Link>
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:gap-7">
            <h3 className="text-primary font-medium text-3xl">
              +99895 000 30 03
            </h3>
            <div className="flex gap-5">
              <div className="p-3 bg-white rounded-full">
                <Image src={"/facebook.svg"} height={20} width={20} alt="" />
              </div>
              <div className="p-3 bg-white rounded-full">
                <Image src={"/instagram.svg"} height={20} width={20} alt="" />
              </div>
              <div className="p-3 bg-white rounded-full">
                <Image src={"/telegram.svg"} height={20} width={20} alt="" />
              </div>
              <div className="p-3 bg-white rounded-full">
                <Image src={"/sms.svg"} height={20} width={20} alt="" />
              </div>
            </div>
            <p className="text-[#677E8B] lg:text-end">
              Toshkent Shahri, Shayxontohur tumani,
              <br /> Istiroxat kochasi, 41-uy
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-3">
          <hr className="bg-secondary" />
          <div className="py-3 flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center text-sm text-[#677E8B]">
            <p>2024 © quduq.uz</p>
            <p className="text-primary">{t("waterDelivery")}</p>
            <p>Разработано в Exord Soft</p>
          </div>
        </div>
      </div>
    </>
  );
}
