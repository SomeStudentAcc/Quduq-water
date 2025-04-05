"use client";
import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import CheckBox from "../ui/CheckBox";
import axiosInstance from "@/axios";
import { Phone, UserData } from "@/types/getMeTypes";
interface ResponseData {
  data: UserData;
  phones: Phone[];
}

export default function PersonalInputs() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [number, setNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [gender, setGender] = useState(1);

  const user = JSON.parse(localStorage.getItem("user") || "[]");
  useEffect(() => {
    const getMe = async () => {
      if (user && user.client) {
        const response = await axiosInstance.get(
          `/get-me?id=${user.client.id}&system=Web`
        );
        console.log(response.data);
        const { data, phones }: ResponseData = response.data;
        setName(data.full_name);
        setDateofBirth(data.birthdate);
        setSerialNumber(data.passport_serial.slice(0, 2));
        setPassportNumber(data.passport_serial.slice(2));
        setNumber(phones[0].number);
      }
    };
    getMe();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("phone", number);
    formData.append("id", user.client.id);
    formData.append("system", "Web");
    formData.append("gender", gender.toString());
    formData.append("first_name", name);
    formData.append("birthdate", dateOfBirth);
    formData.append("passport_serial", `${serialNumber}${passportNumber}`);

    const response = await axiosInstance.post("/update-detail", formData);

    console.log(response.data);
  };
  return (
    <form
      onSubmit={(e)=> updateUser(e)}
      className="max-w-[940px] w-full   bg-secondary rounded-[20px] p-5"
    >
      <h4 className="mb-4 text-primary text-xl">Ваши данные</h4>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="w-full ">
          <div className="bg-white rounded-[1rem] p-4 flex justify-between items-center">
            <div className="flex gap-3">
              <CheckBox isNamed={false} label="Мужской" />
              <CheckBox isNamed={false} label="Женский" />
            </div>
            <p>Пол</p>
          </div>
        </div>
        <Input setter={setName} getter={name} placeHolder="Ваше имя" />
        <Input
          setter={setDateofBirth}
          getter={dateOfBirth}
          placeHolder="Дата рождения"
        />
        <Input setter={setNumber} getter={number} placeHolder="Номер" />
        <div className="flex gap-3">
          <Input
            className="max-w-[110px]"
            setter={setSerialNumber}
            getter={serialNumber}
            placeHolder="Серия"
          />
          <Input
            setter={setPassportNumber}
            getter={passportNumber}
            placeHolder="Номер паспорта"
          />
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-primary py-4 flex items-center justify-center text-white "
            text="Редактировать данные"
          />
        </div>
      </div>
    </form>
  );
}
