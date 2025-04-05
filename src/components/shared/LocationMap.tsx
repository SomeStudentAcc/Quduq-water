import { useEffect, useRef, useState } from "react";
import { useHeaderStore } from "@/stores/headerStore";
import Image from "next/image";
import MapInputs from "./MapInputs";
import { IRegion } from "@/types/getDataTypes";
import { useClickAway } from "react-use";
import { useTranslations } from "next-intl";

interface Props {
  regions: IRegion[];
}

export interface Region {
  id: number;
  name: string;
}

export default function LocationMap({ regions }: Props) {
  const { toggleMapOpened } = useHeaderStore();
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState<IRegion>({ id: 0, name: "" });
  const [isRegionOpened, setRegionOpened] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const t = useTranslations()

  const refRegion = useRef(null);

  useClickAway(
    refRegion,
    () => {
      setRegionOpened(false);
    },
    ["click"]
  );

  useEffect(() => {
    const initMap = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          const myMap = new window.ymaps.Map("map", {
            center: [41.2995, 69.2401],
            zoom: 15,
          });

          const getAddress = (coords) => {
            window.ymaps.geocode(coords).then((res) => {
              const firstGeoObject = res.geoObjects.get(0);
              let addressLine = firstGeoObject.getAddressLine();

              // Check if "Ташкент" exists in the address and remove it
              if (addressLine.includes("Ташкент")) {
                addressLine = addressLine.replace("Ташкент,", "").trim();
              }

              setAddress(addressLine);
              const point = firstGeoObject.geometry.getCoordinates();
              setLatitude(point[0]);
              setLongitude(point[1]);
            });
          };

          getAddress(myMap.getCenter());

          myMap.events.add("boundschange", () => {
            const newCenter = myMap.getCenter();
            getAddress(newCenter);
          });
        });
      }
    };

    initMap();
  }, []);

  return (
    <div className="flex flex-col gap-9 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">{t("deliveryAddress")}</h2>
        <div
          onClick={() => toggleMapOpened(false)}
          className="bg-secondary rounded-full p-3"
        >
          <Image src={"/closeBlue.svg"} width={18} height={18} alt="" />
        </div>
      </div>
      <div className="bg-secondary overflow-y-auto flex flex-col gap-5 p-5 rounded-[20px]">
        <div className=" ">
          <div className="flex flex-col lg:flex-row items-center gap-5">
            <div className="flex relative w-full items-center">
              <input
                className="py-4 px-11 w-full text-[#677E8B] font-medium bg-white rounded-[6.2rem]"
                placeholder="Введите адрес"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Image
                className="absolute left-[10px]"
                src={"/search.svg"}
                width={24}
                height={24}
                alt="search"
              />
            </div>
            <div className="lg:block hidden max-w-[250px] w-full relative">
              {region.name ? (
                <button
                  onClick={() => setRegionOpened(true)}
                  className="py-4 flex gap-5 justify-center items-center  text-primary  w-full rounded-[50px] bg-secondary border-primary border"
                >
                  {region.name}
                </button>
              ) : (
                <button
                  onClick={() => setRegionOpened(true)}
                  className="py-4 flex gap-5 justify-center items-center  text-primary  w-full rounded-[50px] bg-secondary border-primary border"
                >
                  {t('chooseRegion')}
                  <Image
                    className="flex-shrink-0"
                    src={"/arrow-down.png"}
                    width={14}
                    height={14}
                    alt="burger"
                  />
                </button>
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
            <button className="py-4 lg:block hidden text-white max-w-[170px] w-full rounded-[50px] bg-primary">
              {t('find')}
            </button>
          </div>
        </div>

        <div
          id="map"
          className="w-full relative rounded-[10px] overflow-hidden h-[390px]"
        >
          <Image
            className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={"/MapPin.svg"}
            height={30}
            width={30}
            alt="pin"
          />
        </div>
        <MapInputs
          regions={regions}
          address={address}
          setAddress={setAddress}
          latitude={latitude}
          longitude={Longitude}
          region={region}
          setRegion={setRegion}
        />
      </div>
    </div>
  );
}
