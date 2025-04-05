import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useHeaderStore } from "@/stores/headerStore";
import axiosInstance from "@/axios";
import { useTranslations } from "next-intl";

export default function LogIn({ phone, setPhone }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toggleReg } = useHeaderStore();
  const t = useTranslations();

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
        handleLogIn();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogIn = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("code", code);
      formData.append("system", "Web");

      const response = await axiosInstance.post("/auth", formData);
      const { success } = response.data;
      if (success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toggleReg(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Input placeHolder={t("number")} setter={setPhone} getter={phone} />
      <Input placeHolder={t("enterCode")} setter={setCode} getter={code} />
      <Button
        className={`w-full text-white flex justify-center items-center py-4 ${
          loading ? "bg-gray-500" : "bg-primary"
        }`}
        text={loading ? "Loading..." : t("next")}
        onClick={handleLogIn}
        disabled={loading}
      />
    </>
  );
}
