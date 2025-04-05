"use client";
import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import axiosInstance from "@/axios";
import Register from "./Register";
import LogIn from "./LogIn";
import { useTranslations } from "next-intl";

export default function Auth() {
  const [phone, setPhone] = React.useState("");
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const t = useTranslations()

  const handleSendCode = async (): Promise<void> => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("system", "Web");

      const response = await axiosInstance.post<{ is_registered: boolean }>(
        "/send-code",
        formData
      );
      const { is_registered } = response.data;
      console.log(response.data);
      
      if (is_registered) {
        setStep(3);
      } else {
        setStep(2);
      }
    } catch (error) {
      console.error("Error sending code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"bg-secondary p-5 rounded-[20px]"}>
      {step == 1 && (
        <>
          <Input placeHolder={t('number')} setter={setPhone} getter={phone} />
          <Button
            onClick={handleSendCode}
            className={`w-full text-white flex justify-center items-center py-4 ${loading ? 'bg-grey' : 'bg-primary'}`}
            text={loading ? "Loading..." : t('next')}
            disabled={loading}
          />
        </>
      )}
      {step == 2 && <Register phone={phone} setPhone={setPhone} />}
      {step == 3 && <LogIn phone={phone} setPhone={setPhone}  />}
    </div>
  );
}
