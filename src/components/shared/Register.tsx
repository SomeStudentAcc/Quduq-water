/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Input from "../ui/Input";
import CheckBox from "../ui/CheckBox";
import Button from "../ui/Button";
import axiosInstance from "@/axios";
import { useHeaderStore } from "@/stores/headerStore";
import { useTranslations } from "next-intl";

export default function Register({ phone, setPhone }) {
  const [gender, setGender] = useState("1");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { toggleReg } = useHeaderStore();
  const t = useTranslations()

  const checkCode = async (): Promise<void> => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("code", code);
      formData.append("system", "Web");

      const response = await axiosInstance.post("/check-code", formData);
      const { success } = response.data;
      if (success) {
        handleRegister();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("system", "Web");
      formData.append("code", code);
      formData.append("gender", gender);
      formData.append("first_name", name);
      formData.append("birthdate", birthDate);
      formData.append("passport_serial", `${passportSeries}${passportNumber}`);

      const response = await axiosInstance.post("/register", formData);
      const { success } = response.data;
      if (success) {
        localStorage.setItem("user", JSON.stringify(response.data))

        toggleReg(false);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-primary mb-3">{t('chooseGender')}</p>
        <div className="flex gap-5">
          <div className="bg-white w-full p-4 rounded-[1rem]">
            <CheckBox label={t('male')} isNamed={false} />
          </div>
          <div className="bg-white w-full p-4 rounded-[1rem]">
            <CheckBox label={t('female')} isNamed={false} />
          </div>
        </div>
      </div>
      <Input placeHolder={t('yourName')} getter={name} setter={setName} />
      <Input
        placeHolder={t('dateofBirth')}
        getter={birthDate}
        setter={setBirthDate}
      />
      <Input placeHolder={t('number')} getter={phone} setter={setPhone} />
      <Input placeHolder={t('code')} getter={code} setter={setCode} />
      <div className="flex gap-3">
        <Input
          className="max-w-[110px]"
          placeHolder={t('serialNumber')}
          getter={passportSeries}
          setter={setPassportSeries}
        />
        <Input
          placeHolder={t('passportNumber')}
          getter={passportNumber}
          setter={setPassportNumber}
        />
      </div>
      <div>
        <Button
          className={`w-full py-4 flex items-center justify-center text-white ${
            loading ? "bg-gray-500" : "bg-primary"
          }`}
          text={loading ? t('loading') : t('next')}
          onClick={checkCode}
          disabled={loading}
        />
      </div>
    </div>
  );
}
