"use client";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import React, { useState } from "react";
import ModalOverlay from "../ui/ModalOverlay";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function ProfileLinks() {
  const [isModal, setModal] = useState(false);
  const router = useRouter()
  const locale = useLocale()
  const arr = [
    {
      name: "Ваши данные",
      slug: "/profile",
    },
    {
      name: "Заказы",
      slug: "/profile/orders",
    },
    {
      name: "Мои адреса",
      slug: "/profile/addresses",
    },
  ];
  return (
    <>
      <div className=" w-full bg-secondary  rounded-[20px]  px-5 overflow-hidden">
        {arr.map((el, index) => (
          <Link href={el.slug} key={index}>
            <div className="flex justify-between items-center p-4 border-b-[#E9ECF2] border-b">
              <p className="font-medium">{el.name}</p>
              <Image
                className="flex-shrink-0 rotate-[-90deg]"
                src={"/arrow-down.png"}
                width={14}
                height={14}
                alt="burger"
              />
            </div>
          </Link>
        ))}
        <div onClick={()=> setModal(true)} className="flex justify-between items-center p-4">
          <p className="font-medium">Выйти</p>
          <Image
            className="flex-shrink-0 rotate-[-90deg]"
            src={"/arrow-down.png"}
            width={14}
            height={14}
            alt="burger"
          />
        </div>
      </div>
      {isModal && (
        <ModalOverlay toggler={setModal} className="p-12 max-w-[29rem] w-full">
          <div className="flex flex-col gap-8 justify-center items-center">
            <h3 className="font-semibold text-xl">Выйти из профиля?</h3>
            <div className="flex justify-center items-center gap-5 w-full">
              <Button
              onClick={()=>{
                localStorage.removeItem('user')
                router.push(`/${locale}/`)
                
              }}
                className="py-4 max-w-[7rem] w-full text-white bg-primary"
                text="Да"
              />
              <Button
              onClick={()=> setModal(false)}
                className="py-4  max-w-[7rem] w-full bg-secondary"
                text="Нет"
              />
            </div>
          </div>
        </ModalOverlay>
      )}
    </>
  );
}
