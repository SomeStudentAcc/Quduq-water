import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";

export default function NavLang() {
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

  useEffect(() => {
    if (locale === "uz") {
      setSelectedLang("O‘zbekcha");
    } else if (locale === "ru") {
      setSelectedLang("Русский");
    } else if (locale === "en") {
      setSelectedLang("English");
    }
  }, [locale]);
  return (
    <>
      <div
        onClick={() => setOpened(!isOpened)}
        className="hidden relative lg:flex flex-shrink-0 gap-1 items-center bg-secondary rounded-[3.2rem] p-3"
      >
        <Image src={"/GlobeSimple.svg"} width={24} height={24} alt="burger" />
        <div className="flex items-center gap-1">
          <span>{selectedLang}</span>
          <Image
            className="flex-shrink-0 h-3"
            src={"/arrow-down.png"}
            width={12}
            height={12}
            alt="burger"
          />
        </div>
        {isOpened && (
          <div
            ref={ref}
            className="absolute w-full bg-white flex flex-col overflow-hidden rounded-[1rem] left-0 top-full mt-5 shadow-md"
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
      </div>
    </>
  );
}
