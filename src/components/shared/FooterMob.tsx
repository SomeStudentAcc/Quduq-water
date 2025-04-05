"use client";
import { useHeaderStore } from "@/stores/headerStore";
import React from "react";
import FooterMenu from "./FooterMenu";
import { IGetData } from "@/types/getDataTypes";
import FooterMobNav from "./FooterMobNav";

interface Props {
  data: IGetData;
}

export default function FooterMob({ data }: Props) {
  const { toggleMobMenu, isMobMenu, toggleModalProd, setModalProd } = useHeaderStore();
  const { products } = data;

  return (
    <>
      <FooterMobNav className="sticky bottom-0 z-20" />

      <FooterMenu
        products={products}
        isMobMenu={isMobMenu}
        toggleMobMenu={toggleMobMenu}
        toggleModalProd={toggleModalProd}
        setModalProd={setModalProd}
      />
    </>
  );
}
