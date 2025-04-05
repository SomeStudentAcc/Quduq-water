import { Poppins } from "next/font/google";

export const metadata = {
  title: {
    template: "%s - Quduq",
    default: "Лучшая вода в городе",
  },
  description:
    "Добро пожаловать в Chocolate Bakery! Официальный сайт шоколадницы в Самарканде. Закажите вкусные торты, пирожные, свежую выпечку и десерты для любого случая. Высокое качество и незабываемый вкус!",
  keywords: ["вода Ташкент"],
  applicationName: "Quduq Water",
  assets: "/assets/",
  authors: { name: "Exord Soft", url: "https://exord.uz" },
  creator: "Exord",
  generator: "Exord Soft",
};

const geistPopins = Poppins({
  variable: "--font-geist-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function MainLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body
        className={`${geistPopins.variable} min-h-screen flex flex-col  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
