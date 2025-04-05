"use client";
import { useHeaderStore } from "@/stores/headerStore";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  className: string;
}

export default function FooterMobNav({ className }: Props) {
  const { toggleMobMenu, toggleCart } = useHeaderStore();
  const t = useTranslations();
  return (
    <div className={clsx(" w-full bg-white ", className)}>
      <div className=" container py-2 border-[#EEEEEE] border-t w-full lg:py-24 mx-auto px-5 flex lg:hidden">
        <div className="flex justify-between w-full">
          <Link
            href={"/"}
            className="flex flex-col justify-center items-center"
          >
            <Image
              className="flex-shrink-0"
              src={"/House.svg"}
              height={24}
              width={24}
              alt=""
            />
            <p className="font-medium text-xs hover:text-primary text-[#677E8B]">
              {t("main")}
            </p>
          </Link>
          <Link
            href={"/profile"}
            className="flex flex-col justify-center items-center"
          >
            <Image
              className="flex-shrink-0"
              src={"/User.svg"}
              width={24}
              height={24}
              alt="burger"
            />{" "}
            <p className="font-medium text-xs hover:text-primary text-[#677E8B]">
              {t("profile")}
            </p>
          </Link>
          <div
            onClick={() => toggleCart(true)}
            className="flex flex-col justify-center items-center"
          >
            <Image
              className="flex-shrink-0"
              src={"/cart.svg"}
              width={24}
              height={24}
              alt="burger"
            />
            <p className="font-medium text-[13px] hover:text-primary text-[#677E8B]">
              {t("cart")}
            </p>
          </div>
          <div
            onClick={() => toggleMobMenu()}
            className="flex flex-col justify-center items-center"
          >
            <Image
              className="flex-shrink-0"
              src={"/List.svg"}
              height={24}
              width={24}
              alt=""
            />
            <p className="font-medium text-xs hover:text-primary text-[#677E8B]">
              {t("menu")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
