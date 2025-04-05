"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "../ui/Input";
import { IRegion } from "@/types/getDataTypes";
import { IAddress } from "@/types/getAddressTypes";
import { useHeaderStore } from "@/stores/headerStore";
import { useClickAway } from "react-use";
import axiosInstance from "@/axios";

interface Props {
  modalAddress: IAddress;
}

export default function AddressSingle({ modalAddress }: Props) {
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [floor, setFloor] = useState("");
  const [apartment, setApartment] = useState("");
  const [additional, setAdditional] = useState("");
  const [region, setRegion] = useState<IRegion>();
  const [isRegionOpened, setRegionOpened] = useState(false);
  const { appData } = useHeaderStore();
  const refRegion = useRef(null);

  useClickAway(
    refRegion,
    () => {
      setRegionOpened(false);
    },
    ["click"]
  );

  useEffect(() => {
    if (modalAddress) {
      const regionId = appData.regions.find(
        (el) => el.id === modalAddress?.region_id
      );
      setAddress(modalAddress.street);
      setHouse(modalAddress.home);
      setFloor(modalAddress.floor);
      setApartment(modalAddress.apartment);
      setAdditional(modalAddress.point);
      setRegion(regionId);
    }
  }, [modalAddress, appData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", modalAddress.client_id.toString());
    formData.append("system", "Web");
    formData.append("address_id", modalAddress.id.toString());
    formData.append("street", address);
    formData.append("region_id", region?.id.toString());
    formData.append("floor", floor);
    formData.append("apartment", apartment);
    formData.append("point", additional);
    formData.append("home", house);
    formData.append("latitude", modalAddress?.latitude);
    formData.append("longitude", modalAddress?.longitude);

    try {
      const response = await axiosInstance.put("/edit-address", formData);
      console.log(response.data);
      if (response.data.success) {
        setAddress("");
        setRegion({ id: 0, name: "" });
        setHouse("");
        setFloor("");
        setApartment("");
        setAdditional("");
        localStorage.setItem(
          "q_address",
          JSON.stringify(response.data.address)
        );
        setTimeout(() => {}, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div>
          <div className=" w-full relative">
            <div
              onClick={() => setRegionOpened(true)}
              className="py-4 flex gap-5 justify-center items-center  text-primary  w-full rounded-[50px] bg-secondary border-primary border"
            >
              {region?.name}
            </div>

            {isRegionOpened && (
              <div
                ref={refRegion}
                className="absolute z-50 w-full bg-white flex flex-col max-h-[300px] overflow-y-auto rounded-[1rem] left-0 top-full mt-5 shadow-md"
              >
                {appData.regions.map((el) => (
                  <div
                    onClick={() => {
                      setRegion({ id: el.id, name: el.name });
                      setTimeout(() => setRegionOpened(false), 50);
                    }}
                    key={el.id}
                    className="border-secondary hover:bg-gray-200 border-b"
                  >
                    <div className="flex justify-between items-center px-2 py-4">
                      <p className="font-medium text-primary">{el.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Input placeHolder={"Подъезд"} setter={setHouse} getter={house} />
        <Input placeHolder={"Этаж"} setter={setFloor} getter={floor} />
        <Input
          placeHolder={"Квартира"}
          setter={setApartment}
          getter={apartment}
        />
        <Input
          placeHolder={"Дополнительно"}
          setter={setAdditional}
          getter={additional}
        />
        <Input placeHolder={"Адрес"} setter={setAddress} getter={address} />
      </div>
      <div>
        <button
          type="submit"
          className="py-4 w-full rounded-[50px] text-white bg-primary"
        >
          Изменить адрес
        </button>
      </div>
    </form>
  );
}
