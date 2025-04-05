import React, { useEffect } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import { IAddress } from "@/types/getAddressTypes";
import { useTranslations } from "next-intl";

interface Props {
  setAddressMob: React.Dispatch<React.SetStateAction<boolean>>;
  addresses: IAddress[];
  toggleMapOpened: (entity: boolean) => void
}

export default function AdressMob({ setAddressMob, addresses, toggleMapOpened }: Props) {
  const t = useTranslations()
  const [selectedAddress, setSelectedAddress] = React.useState<IAddress>();
  useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  useEffect(() => {
    const address = localStorage.getItem("q_address");
    if (address) {
      setSelectedAddress(JSON.parse(address));
    }
  }, []);

  return (
    <div className="fixed top-0 bottom-0 left-0 w-full  h-full z-30 ">
      <div className="h-full w-full bg-white ">
        <div className="flex flex-col relative justify-between h-full">
          <div className="h-full p-10">
            <div className="mb-10">
              <div className="flex justify-between">
                <h3 className="font-semibold text-2xl">{t('deliveryAddress')}</h3>
                <div className="bg-secondary rounded-full p-3">
                  <Image
                    onClick={() => setAddressMob(false)}
                    src={"/closeBlue.svg"}
                    width={18}
                    height={18}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5  h-full overflow-y-auto pb-8">
              {addresses?.map((el, index) => (
                <div
                  key={el.id}
                  onClick={() => {
                    localStorage.setItem("q_address", JSON.stringify(el));
                    setTimeout(() => {
                      setAddressMob(false);
                    }, 100);
                  }}
                  className={`hover:text-primary text-black ${
                    index !== addresses.length - 1
                      ? "border-b border-secondary"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center px-2 py-4">
                    <p className="font-medium ">{el?.street}</p>
                    {selectedAddress?.id === el.id && (
                      <Image
                        src={"/tick-circle.svg"}
                        width={19}
                        height={19}
                        alt="tick"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-secondary absolute bottom-0 right-0 w-full px-10 py-6 flex gap-5 lg:gap-0 flex-col lg:flex-row justify-between items-center">
            <Button
            onClick={()=>{
              setAddressMob(false)
              toggleMapOpened(true)
            }}
              text={t('nav.addAddress')}
              className="bg-primary text-white py-4 max-w-[19.5rem] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
