/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import axiosInstance from "@/axios";
import AddressSingle from "@/components/shared/AddressSingle";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ProfileLinks from "@/components/shared/ProfileLinks";
import GreySpace from "@/components/ui/GreySpace";
import ModalOverlay from "@/components/ui/ModalOverlay";
import { useAddressesStore } from "@/stores/addressesStore";
import { IAddress } from "@/types/getAddressTypes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Addresses() {
  const [addresses, setAddresses] = React.useState<IAddress[]>([]);
  const [user, setUser] = React.useState<{ client?: { id?: number } }>({});
  const [isModal, setModal] = React.useState(false);
  const [modalAddress, setModalAddress] = React.useState<IAddress>();
  const t =  useTranslations();
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/profile/addresses",
      label: t("profile"),
    },

  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axiosInstance.get(
          `/get-addresses?id=${user?.client?.id?.toString()}&system=Web`
        );
        console.log(response.data);
        setAddresses(response.data.addresses);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.client?.id) {
      fetchAddresses();
    }
  }, [user]);

  const deleteAddress = async (id: number) => {
    if (!user?.client?.id) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await axiosInstance.delete(
        `/delete-address?id=${user.client.id.toString()}&address_id=${id}&system=Web`
      );
      setAddresses(addresses.filter((el) => el.id !== id));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-5">
        <Breadcrumbs items={breadcrumbs}/>

        <h2 className="font-semibold text-4xl mb-12">{t('profile')}</h2>
        <div className="w-full mb-[120px] flex flex-col lg:flex-row gap-12 lg:justify-between">
          <div className="xl:max-w-[21rem] lg:max-w-[18rem] w-full">
            <ProfileLinks />
          </div>
          <GreySpace className="max-w-[940px] w-full" title="Мои адреса">
            <div className="bg-white rounded-[1rem] px-4">
              {addresses.map((el, index) => (
                <div
                  className={`border-b py-4 flex justify-between items-center  font-medium ${
                    index === addresses.length - 1 ? "border-none" : ""
                  }`}
                  key={index}
                >
                  <h4>{el.street}</h4>
                  <div className="flex gap-5">
                    <Image
                      onClick={() => deleteAddress(el.id)}
                      src={"/closeBlue.svg"}
                      width={20}
                      height={20}
                      alt=""
                    />
                    <Image
                      onClick={() => {
                        setModal(true);
                        setModalAddress(el);
                      }}
                      src={"/SlidersHorizontal.svg"}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </GreySpace>
        </div>
      </div>

      {isModal && (
        <ModalOverlay
          isRounded={false}
          toggler={setModal}
          className="md:p-8 lg:max-w-[1180px] w-full my-[100px]  p-4  z-40 "
        >
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-2xl">Изменить адресс</h2>
              <div
                onClick={() => setModal(false)}
                className="bg-secondary rounded-full p-3"
              >
                <Image src={"/closeBlue.svg"} width={18} height={18} alt="" />
              </div>
            </div>
            <GreySpace title="Адресс">
              <AddressSingle modalAddress={modalAddress} />
            </GreySpace>
          </div>
        </ModalOverlay>
      )}
    </>
  );
}
