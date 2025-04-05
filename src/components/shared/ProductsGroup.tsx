import React from "react";
import ProductCard from "./ProductCard";
import MobProdCard from "./MobProdCard";
import { IProduct } from "@/types/getDataTypes";
import { getTranslations } from "next-intl/server";

interface Props {
  products: IProduct[];
}

export default async function ProductsGroup({ products }: Props) {
  const t = await getTranslations()

  return (
    <div className="container mx-auto px-5 mb-12 lg:mb-[7.5rem]">
      <h2 className="font-semibold text-4xl mb-5 lg:mb-12">{t('ourProducts')}</h2>
      <div
        className="border-[#F0F2F6]  border rounded-[2rem] hidden  lg:grid lg:grid-cols-6  overflow-hidden"
        style={{
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "auto",
        }}
      >
        {products.map((el, index) => (
          <ProductCard prod={el} key={el.id} id={el.id} index={index} name={el.name} price={el.price} image={el.image} />
        ))}
      </div>
      <div className="border-[#F0F2F6] border rounded-[2rem] flex flex-col  lg:hidden overflow-hidden">
        <div className="lg:hidden">
          {products.map((el) => (
            <MobProdCard  key={el.id} prod={el} id={el.id}  name={el.name} price={el.price} image={el.image}  />
          ))}
        </div>
      </div>
    </div>
  );
}
