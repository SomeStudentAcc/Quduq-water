"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavLocation from "./NavLocation";
import NavLang from "./NavLang";
import NavMobLocation from "./NavMobLocation";
import NavMobLang from "./NavMobLang";
import Cart from "./Cart";
import { useHeaderStore } from "@/stores/headerStore";
import MenuItem from "./MenuItem";
import { IGetData } from "@/types/getDataTypes";
import ModalOverlay from "../ui/ModalOverlay";
import ProductModal from "./ProductModal";
import LocationMap from "./LocationMap";
import Auth from "./Auth";
import axiosInstance from "@/axios";
import { useCart } from "@/stores/cart";
import { IAddress } from "@/types/getAddressTypes";
import AdressMob from "./AdressMob";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface Props {
  data: IGetData;
}

export default function Header({ data }: Props) {
  const [isAuth, setAuth] = useState(false);
  const [isAddressMob, setAddressMob] = useState(false);
  const { setAllProds, setCart } = useCart();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [user, setUserData] = React.useState<{ client?: { id?: number } }>({});
  const { setAppData } = useHeaderStore();
  const { setUser } = useCheckoutStore();
  const t = useTranslations();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserData(JSON.parse(userData));
      setAppData(data);
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user?.client?.id) {
      const getAddresses = async () => {
        try {
          const addressArray = await axiosInstance.get(
            `/get-addresses?id=${user?.client?.id?.toString()}&system=Web`
          );
          console.log(addressArray.data);
          setAddresses(addressArray.data.addresses);
        } catch (error) {
          console.log(error);
        }
      };
      getAddresses();
    }
  }, [user]);

  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get("/data", {
        params: {
          system: "Web",
        },
      });
      const data: IGetData = res.data;

      const cart = localStorage.getItem("q_cart");

      const cartData = cart ? JSON.parse(cart) : [];
      console.log(cartData);
      setCart(cartData);

      const productsWithAmount = data.products.map((product) => {
        const cartItem = cartData.find(
          (item: { id: string; amount: number }) =>
            item.id.toString() === product.id.toString()
        );
        return {
          ...product,
          amount: cartItem ? cartItem.amount : 0,
        };
      });

      setAllProds(productsWithAmount);
    };

    getData();
  }, []);

  useEffect(() => {
    setAuth(!!localStorage.getItem("user"));
  }, []);

  const {
    isCart,
    isMenu,
    isModalProd,
    isReg,
    modalProd,
    isMapOpened,
    toggleMapOpened,
    toggleReg,
    toggleModalProd,
    toggleMenu,
    toggleCart,
    setModalProd,
  } = useHeaderStore();
  const { products } = data;
  return (
    <>
      <nav className="sticky top-0 z-30 ">
        <div className="border-b-secondary border-b bg-white">
          <div className="py-6 container mx-auto px-5  flex justify-between items-center ">
            <div className="flex lg:w-1/2 items-center gap-8 xl:gap-[5rem]">
              <Link href={"/"}>
                <Image
                  src={"/navLogo.svg"}
                  className="w-[106px] h-[26px] lg:w-[160px] lg:h-[39px]"
                  width={160}
                  height={39}
                  alt="logo"
                />
              </Link>
              <div className="lg:flex hidden w-full gap-3 xl:gap-5 ">
                <button
                  onClick={() => toggleMenu()}
                  className=" bg-secondary flex-shrink-0 p-3 rounded-full"
                >
                  {isMenu ? (
                    <Image
                      src={"/closeBlue.svg"}
                      width={24}
                      height={24}
                      alt=""
                    />
                  ) : (
                    <Image
                      src={"/List.svg"}
                      width={24}
                      height={24}
                      alt="burger"
                    />
                  )}
                </button>
                <NavLocation
                  addresses={addresses}
                  toggleMapOpened={toggleMapOpened}
                />
              </div>
            </div>
            <div className="flex items-center gap-6 xl:gap-12">
              <ul className="lg:flex hidden text-nowrap items-center gap-4 xl:gap-7">
                <Link href={"/aboutUs"}>
                  <li className="hover:text-primary">{t("nav.aboutUs")}</li>
                </Link>
                <Link href={"/contacts"}>
                  <li className="hover:text-primary">{t("nav.contacts")}</li>
                </Link>
                <Link href={"/news"}>
                  <li className="hover:text-primary">{t("nav.news")}</li>
                </Link>
              </ul>

              <div className="flex gap-3 xl:gap-5">
                <NavLang />
                <button className="flex-shrink-0 bg-secondary p-3 rounded-full">
                  <Image
                    src={"/Phone.svg"}
                    width={24}
                    height={24}
                    alt="burger"
                  />
                </button>
                <button className="flex-shrink-0 bg-secondary p-3 rounded-full">
                  <Image
                    src={"/Headset.svg"}
                    width={24}
                    height={24}
                    alt="burger"
                  />
                </button>
                <NavMobLang />
                <NavMobLocation setAddressMob={setAddressMob} />
              </div>

              <div className="hidden lg:flex items-center gap-3 xl:gap-6">
                <Image
                  className="cursor-pointer"
                  onClick={() => toggleCart(true)}
                  src={"/cart.svg"}
                  width={24}
                  height={24}
                  alt="burger"
                />
                {isAuth ? (
                  <Link href={"/profile"}>
                    <Image
                      src={"/User.svg"}
                      width={24}
                      height={24}
                      alt="burger"
                    />
                  </Link>
                ) : (
                  <Image
                    onClick={() => toggleReg(true)}
                    src={"/User.svg"}
                    width={24}
                    height={24}
                    alt="burger"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:block hidden">
          <div
            className={`transition-opacity duration-150 ${
              isMenu ? " py-5 bg-white " : "hidden"
            } `}
          >
            <div className="container mx-auto px-5 ">
              <div className="flex gap-5 overflow-x-auto custom-scrollbar">
                {products.map((el) => (
                  <MenuItem
                    setModalProd={setModalProd}
                    key={el.id}
                    product={el}
                    toggleModalProd={toggleModalProd}
                    className="w-64 flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isModalProd && (
        <ModalOverlay
          toggler={toggleModalProd}
          className="md:p-20 p-4 min-w-[20rem] z-40   md:max-w-[59rem] w-full"
        >
          <ProductModal
            toggleModalProd={toggleModalProd}
            modalProd={modalProd}
          />
        </ModalOverlay>
      )}
      {isReg && (
        <ModalOverlay
          toggler={toggleReg}
          className="md:p-8 p-4 flex flex-col gap-8  max-w-[35rem] z-40  w-full"
        >
          <div className="flex justify-between items-center">
            <h2>{t("registration")}</h2>
            <div
              onClick={() => toggleReg(false)}
              className="bg-secondary rounded-full p-3"
            >
              <Image src={"/closeBlue.svg"} width={18} height={18} alt="" />
            </div>
          </div>
          <Auth />
        </ModalOverlay>
      )}
      {isCart && <Cart />}

      {isMapOpened && (
        <ModalOverlay
          isRounded={true}
          toggler={toggleMapOpened}
          className="md:p-8 lg:max-w-[1180px] h-full lg:h-[95vh] w-full my-[100px]  p-4  z-40 "
        >
          <LocationMap regions={data.regions} />
        </ModalOverlay>
      )}

      {isAddressMob && (
        <div className="lg:hidden ">
          <AdressMob
            toggleMapOpened={toggleMapOpened}
            addresses={addresses}
            setAddressMob={setAddressMob}
          />
        </div>
      )}
    </>
  );
}
