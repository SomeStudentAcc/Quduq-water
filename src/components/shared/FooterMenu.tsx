"use client";
import Image from "next/image";
import React, { useState } from "react";
import Sheet from "../ui/Sheet";
import { IProduct } from "@/types/getDataTypes";
import MenuItem from "./MenuItem";
import FooterMobNav from "./FooterMobNav";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  toggleMobMenu: VoidFunction;
  isMobMenu: boolean;
  toggleModalProd: (entity: boolean) => void;
  products: IProduct[];
  setModalProd: (entity: IProduct) => void;
}

export default function FooterMenu({
  isMobMenu,
  toggleModalProd,
  toggleMobMenu,
  products,
  setModalProd,
}: Props) {
  const router = useRouter();
  const [isProds, setProds] = useState(1);
  const t = useTranslations()
  return (
    <>
      {isMobMenu && isProds == 1 && (
        <Sheet index={"1"} isCart={false}>
          <div className="flex flex-col relative justify-between h-full">
            <div className="border-secondary border-b mb-8">
              <div className=" py-4 px-5">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-2xl">{t('menu')}</h3>
                  <div
                    onClick={() => toggleMobMenu()}
                    className="bg-secondary rounded-full p-3"
                  >
                    <Image
                      src={"/closeBlue.svg"}
                      width={14}
                      height={14}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5 px-5  h-full overflow-y-auto">
              <button
                onClick={() => setProds(2)}
                className="mb-8 flex justify-between outline-none items-center w-full bg-secondary p-3 rounded-[3rem]"
              >
                <p className="font-medium">{t('toProducts')}</p>
                <Image
                  src={"/arrow-right.svg"}
                  className="rotate-[180deg]"
                  width={16}
                  height={16}
                  alt=""
                />
              </button>
              <div>
                <h3 className="mb-4 font-semibold text-lg text-primary">
                  {t('aboutCompany')}
                </h3>
                <ul className="flex flex-col  gap-4 ">
                  <li
                    onClick={() => {
                      toggleMobMenu();
                      router.push("/aboutUs");
                    }}
                    className="cursor-pointer"
                  >
                    {t('nav.aboutUs')}
                  </li>
                  <li
                    onClick={() => {
                      toggleMobMenu();
                      router.push("/contacts");
                    }}
                    className="cursor-pointer"
                  >
                    {t('nav.contacts')}
                  </li>
                  <li>{t('delivery')}</li>
                  <li
                    onClick={() => {
                      toggleMobMenu();
                      router.push("/news");
                    }}
                    className="cursor-pointer"
                  >
                    {t('nav.news')}
                  </li>
                  <li>{t('userPolicy')}</li>
                </ul>
              </div>
            </div>
            <FooterMobNav className="" />
          </div>
        </Sheet>
      )}
      {isMobMenu && isProds == 2 && (
        <Sheet index={"1"} isCart={false}>
          <div className="flex flex-col relative justify-between h-full">
            <div className="border-secondary border-b ">
              <div className=" py-4 px-5">
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <div
                      onClick={() => setProds(1)}
                      className="bg-secondary rounded-full p-3"
                    >
                      <Image
                        src={"/arrow-right.svg"}
                        width={16}
                        height={16}
                        alt=""
                      />
                    </div>
                    <h3 className="font-semibold text-2xl">{t('products')}</h3>
                  </div>
                  <div
                    onClick={() => {
                      toggleMobMenu();
                      setProds(1);
                    }}
                    className="bg-secondary rounded-full p-3"
                  >
                    <Image
                      src={"/closeBlue.svg"}
                      width={14}
                      height={14}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1  flex-col gap-5 px-5 h-full py-12  overflow-y-auto">
              {products.map((el) => (
                <MenuItem
                  key={el.id}
                  product={el}
                  className="w-full"
                  setModalProd={setModalProd}
                  toggleModalProd={toggleModalProd}
                />
              ))}
            </div>
            <FooterMobNav className="" />
          </div>
        </Sheet>
      )}
    </>
  );
}
