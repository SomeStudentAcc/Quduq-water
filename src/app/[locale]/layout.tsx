/* eslint-disable @typescript-eslint/no-explicit-any */
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import FooterMob from "@/components/shared/FooterMob";
import { IGetData } from "@/types/getDataTypes";
import axiosInstance from "@/axios";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata(props) {
  const { locale } = await props.params;

  const title = locale === "en" ? "Quduq" : "Quduq";
  const description =
    locale === "en"
      ? "Discover our amazing products and services."
      : "Откройте для себя наши удивительные продукты";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale,
    },
    twitter: {
      title,
      description,
    },
  };
}

export const revalidate = 600;

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const res = await axiosInstance.get("/data", {
    params: {
      system: "Web",
    },
  });
  const data: IGetData = res.data;
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Header data={data} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FooterMob data={data} />
        <Script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=2d526c45-de15-45fd-a8c4-bb45d417ef92" />
      </NextIntlClientProvider>
    </>
  );
}
