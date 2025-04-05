import React, { SetStateAction, useRef, useState } from "react";
import Input from "../ui/Input";
import axiosInstance from "@/axios";
import { IRegion } from "@/types/getDataTypes";
import Image from "next/image";
import { useClickAway } from "react-use";
import { useHeaderStore } from "@/stores/headerStore";
import { useTranslations } from "next-intl";

interface Props {
  regions: IRegion[];
  address: string;
  setAddress: React.Dispatch<SetStateAction<string>>;
  region: IRegion;
  setRegion: React.Dispatch<SetStateAction<IRegion>>;
  latitude: string;
  longitude: string;
}

export default function MapInputs({
  address,
  setAddress,
  region,
  setRegion,
  latitude,
  longitude,
  regions,
}: Props) {
  const t = useTranslations();
  const [house, setHouse] = useState("");
  const [floor, setFloor] = useState("");
  const [apartment, setApartment] = useState("");
  const [additional, setAdditional] = useState("");
  const [isRegionOpened, setRegionOpened] = useState(false);
  const { toggleMapOpened } = useHeaderStore();
  const id = localStorage.getItem("user")
    ? JSON.parse(localStorage?.getItem("user"))?.client.id
    : "";
  const handleCreateAddress = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("system", "Web");
    formData.append("street", address);
    formData.append("region_id", region.id.toString());
    formData.append("floor", floor);
    formData.append("apartment", apartment);
    formData.append("point", additional);
    formData.append("home", house);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    try {
      const response = await axiosInstance.post("/add-address", formData);
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
        setTimeout(() => {
          toggleMapOpened(false);
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refRegion = useRef(null);

  useClickAway(
    refRegion,
    () => {
      setRegionOpened(false);
    },
    ["click"]
  );

  return (
    <form
      onSubmit={(e) => handleCreateAddress(e)}
      className="w-full grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-5"
    >
      <div className="lg:hidden mb-1  max-w-[250px] w-full relative">
        {region.name ? (
          <div
            onClick={() => setRegionOpened(true)}
            className="py-4 flex gap-4 lg:gap-5 justify-center items-center  text-primary  w-full rounded-[50px] bg-secondary border-primary border"
          >
            {region.name}
          </div>
        ) : (
          <div
            onClick={() => setRegionOpened(true)}
            className="py-4 flex gap-5 justify-center items-center  text-primary  w-full rounded-[50px] bg-secondary border-primary border"
          >
            {t("chooseRegion")}
            <Image
              className="flex-shrink-0"
              src={"/arrow-down.png"}
              width={14}
              height={14}
              alt="burger"
            />
          </div>
        )}
        {isRegionOpened && (
          <div
            ref={refRegion}
            className="absolute z-50 w-full bg-white flex flex-col max-h-[300px] overflow-y-auto rounded-[1rem] left-0 top-full mt-5 shadow-md"
          >
            {regions.map((el) => (
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
      <Input placeHolder={t("entrance")} setter={setHouse} getter={house} />
      <Input placeHolder={"Этаж"} setter={setFloor} getter={floor} />
      <Input
        placeHolder={t("floor")}
        setter={setApartment}
        getter={apartment}
      />
      <Input
        placeHolder={t("additionaly")}
        setter={setAdditional}
        getter={additional}
      />
      <Input
        placeHolder={t("addressName")}
        setter={setAddress}
        getter={address}
      />
      <div>
        <button
          type="submit"
          className="py-4 w-full rounded-[50px] text-white bg-primary"
        >
          {t("nav.addAddress")}
        </button>
      </div>
    </form>
  );
}
