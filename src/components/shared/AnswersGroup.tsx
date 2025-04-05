"use client";
import React, { useState } from "react";
import AnswerCard from "./AnswerCard";
import { IFAQ } from "@/types/getDataTypes";
import { useTranslations } from "next-intl";

interface Props{
  faq: IFAQ[]
}

export default function AnswersGroup({faq}:Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null); 
  const t = useTranslations()

  const handleToggle = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="container mx-auto px-5 lg:flex justify-between mb-12 lg:mb-[7.5rem]">
      <h2 className="font-semibold text-4xl mb-5 lg-mb-0  lg:mr-12">{t('whyUs')}</h2>
      <div className="flex relative items-end flex-col flex-1 gap-2">
        {
          faq.map((el, index) => (
            <AnswerCard
              element={el}
              handleToggle={handleToggle}
              openIndex={openIndex}
              index={index}
              key={el.id}
            />
          ))}
      </div>
    </div>
  );
}
