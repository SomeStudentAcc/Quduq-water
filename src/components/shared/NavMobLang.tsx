/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";

export default function NavMobLang() {
  const [isOpened, setOpened] = useState(false);
  const [selectedLang, setSelectedLang] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const ref = useRef(null);

  useClickAway(
    ref,
    () => {
      setOpened(false);
    },
    ["click"]
  );

  const changeLanguage = (locale: string) => {
    router.replace(pathname, { locale: locale });
  };

  return (
    <>
      <button
        onClick={() => setOpened(true)}
        className="lg:hidden relative flex-shrink-0 bg-secondary p-3 rounded-full"
      >
        <Image src={"/GlobeSimple.svg"} width={24} height={24} alt="burger" />
        {isOpened && (
          <div
            ref={ref}
            className="absolute  bg-white flex flex-col overflow-hidden rounded-[1rem] left-0 top-full mt-5 shadow-md"
          >
            <div className="border-secondary border-b">
              <div
                onClick={() => {
                  setOpened(false);
                  changeLanguage("ru");
                }}
                className="flex justify-between items-center px-2 py-3"
              >
                <p className="font-medium ">Русский</p>
              </div>
            </div>
            <div
              onClick={() => {
                setOpened(false);
                changeLanguage("en");
              }}
              className="border-secondary border-b"
            >
              <div className="flex justify-between items-center px-2 py-3">
                <p className="font-medium ">English</p>
              </div>
            </div>
            <div
              onClick={() => {
                setOpened(false);
                changeLanguage("uz");
              }}
              className="border-secondary border-b"
            >
              <div className="flex justify-between items-center px-2 py-3">
                <p className="font-medium ">O‘zbek</p>
              </div>
            </div>
          </div>
        )}
      </button>
    </>
  );
}
