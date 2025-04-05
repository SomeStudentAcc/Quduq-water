/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import GreySpace from "../ui/GreySpace";
import Input from "../ui/Input";
import Image from "next/image";
import CheckBox from "../ui/CheckBox";
import { IGetData } from "@/types/getDataTypes";
import axiosInstance from "@/axios";
import { useHeaderStore } from "@/stores/headerStore";
import ModalOverlay from "../ui/ModalOverlay";
import AddressSingle from "./AddressSingle";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useTranslations } from "next-intl";

interface Props {
  data: IGetData;
}

export default function CheckoutInputs({ data }: Props) {
  const t = useTranslations();
  const { toggleMapOpened } = useHeaderStore();
  const {
    name,
    setName,
    comment,
    setComment,
    phoneNumber,
    setPhoneNumber,
    isModal,
    setModal,
    modalAddress,
    setModalAddress,
    checkedVal,
    setCheckedVal,
    selectedPayment,
    setSelectedPayment,
    addresses,
    setAddresses,
    user,
    setUser,
  } = useCheckoutStore();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setName(JSON.parse(userData).client.first_name);
      setPhoneNumber(JSON.parse(userData).phones[0].number);
    }
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axiosInstance.get(
          `/get-addresses?id=${user?.client?.id?.toString()}&system=Web`
        );
        setAddresses(response.data.addresses);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.client?.id) {
      fetchAddresses();
    }
  }, [user]);

  useEffect(() => {
    const localAddress = JSON.parse(localStorage.getItem("q_address")) || {};

    const selectedAddress = addresses.find((el) => el.id === localAddress.id);
    if (selectedAddress) {
      setCheckedVal(selectedAddress);
    }
  }, [addresses]);

  return (
    <>
      <div className="lg:max-w-[43.5rem] w-full flex flex-col gap-5">
        <GreySpace className="w-full" title={t("yourData")}>
          <div className="flex flex-col lg:flow-row  w-full gap-5">
            <Input placeHolder={t("yourName")} setter={setName} getter={name} />
            <Input
              placeHolder={t("number")}
              setter={setPhoneNumber}
              getter={phoneNumber}
            />
          </div>
        </GreySpace>
        <GreySpace className="w-full" title={t("yourAddresses")}>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col bg-white p-4 rounded-[1rem]  gap-4">
              {addresses.map((el, index) => (
                <div key={el.id} className="flex flex-col gap-4">
                  <div className="flex   justify-between items-center ">
                    <CheckBox
                      element={el}
                      onChange={setCheckedVal}
                      checked={checkedVal?.id == el.id ? true : false}
                      label={el.street}
                      isNamed={false}
                    />
                    <Image
                      onClick={() => {
                        setModalAddress(el);
                        setTimeout(() => {
                          setModal(true);
                        }, 100);
                      }}
                      src={"/SlidersHorizontal.svg"}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                  {addresses.length - 1 !== index && <hr />}
                </div>
              ))}
            </div>
            <div>
              <h2 className="font-semibold text-primary text-xl mb-4">
                {t("deliveryAddress")}
              </h2>
              <div className="flex justify-between items-center p-4 bg-white rounded-[1rem] ">
                <div className="flex gap-3">
                  <Image
                    src={"/MapPinLine.svg"}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <p className="text-[#677E8B] font-medium">
                    {t("addNewAddress")}
                  </p>
                </div>
                <Image
                  onClick={() => toggleMapOpened(true)}
                  className="rotate-[45deg]"
                  src={"/closeBlue.svg"}
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
            </div>
          </div>
        </GreySpace>
        <GreySpace className="w-full" title={t("choosePaymentMethod")}>
          <div className="flex flex-wrap lg:flex-row w-full gap-5">
            {Object.entries(data.payments).map(([key, value], index) => (
              <div key={index} className=" p-4 bg-white rounded-[1rem]">
                <CheckBox
                  element={key.toString()}
                  onChange={setSelectedPayment}
                  checked={selectedPayment == key.toString() ? true : false}
                  label={value}
                  isNamed={false}
                />
              </div>
            ))}
          </div>
        </GreySpace>
        <GreySpace className="w-full" title={t("addOrderInfo")}>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("enter")}
            className="bg-white rounded-[1rem] p-4 w-full"
          />
        </GreySpace>
      </div>
      {isModal && (
        <ModalOverlay
          isRounded={false}
          toggler={setModal}
          className="md:p-8 lg:max-w-[1180px] w-full my-[100px]  p-4  z-40 "
        >
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-2xl">{t("changeAddress")}</h2>
              <div
                onClick={() => setModal(false)}
                className="bg-secondary rounded-full p-3"
              >
                <Image src={"/closeBlue.svg"} width={18} height={18} alt="" />
              </div>
            </div>
            <GreySpace title={t("address")}>
              <AddressSingle modalAddress={modalAddress} />
            </GreySpace>
          </div>
        </ModalOverlay>
      )}
    </>
  );
}
