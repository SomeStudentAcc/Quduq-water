"use client";
import { IAddress } from "@/types/getAddressTypes";
import { formatTextlength } from "@/utils/formatTextLength";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";

interface Props {
  toggleMapOpened: (entity: boolean) => void;
  addresses: IAddress[];
}

export default function NavLocation({ toggleMapOpened, addresses }: Props) {
  const [isOpened, setOpened] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddress>();
  const ref = useRef(null);
  const t = useTranslations()

  useClickAway(
    ref,
    () => {
      setOpened(false);
    },
    ["click"])

  useEffect(() => {
    const address = localStorage.getItem("q_address");
    if (address) {
      setSelectedAddress(JSON.parse(address));
    }
  }, []);
  return (
    <>
      <div
        onClick={() => setOpened(!isOpened)}
        className="lg:flex relative hidden justify-between items-center bg-secondary rounded-[3rem] p-3 mr-1  max-w-[290px] w-full"
      >
        <div className="flex overflow-x-hidden  gap-1">
          {selectedAddress?.street ? (
            <>
              <Image
                className="flex-shrink-0"
                src={"/MapPin.svg"}
                width={24}
                height={24}
                alt="burger"
              />
              <p className="text-nowrap">{formatTextlength(selectedAddress?.street, 22)}</p>
            </>
          ) : (
            <>
              <Image
                className="flex-shrink-0"
                src={"/MapPin.svg"}
                width={24}
                height={24}
                alt="burger"
              />
              <span>{t('nav.deliveryLocation')}</span>
            </>
          )}
        </div>
        <span>
          <Image
            className="flex-shrink-0"
            src={"/arrow-down.png"}
            width={14}
            height={14}
            alt="burger"
          />
        </span>
        {isOpened && (
          <div ref={ref} className="absolute w-full bg-white flex flex-col overflow-hidden rounded-[1rem] left-0 top-full mt-5 shadow-md">
            {addresses.map((el) => (
              <div
                key={el.id}
                onClick={() => {
                  localStorage.setItem("q_address", JSON.stringify(el));
                  setSelectedAddress(el);
                }}
                className="border-secondary hover:text-primary text-black border-b"
              >
                <div className="flex justify-between items-center px-2 py-4">
                  <p className="font-medium ">{el.street}</p>
                </div>
              </div>
            ))}
            <div
              onClick={() => toggleMapOpened(true)}
              className="border-secondary border-b"
            >
              <div className="flex justify-between items-center px-2 py-4">
                <p className="font-medium text-primary">{t('nav.addAddress')}</p>
                <Image
                  className="rotate-[45deg]"
                  src={"/closeBlue.svg"}
                  width={19}
                  height={19}
                  alt=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
