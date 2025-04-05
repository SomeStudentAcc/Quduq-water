import Breadcrumbs from "@/components/shared/Breadcrumbs";
import OrdersTable from "@/components/shared/OrdersTable";
import ProfileLinks from "@/components/shared/ProfileLinks";
import { getTranslations } from "next-intl/server";

export default async function Orders() {
  const t = await getTranslations();
  const breadcrumbs = [
    {
      url: "/",
      label: t("main"),
    },
    {
      url: "/profile/orders",
      label: t("profile"),
    },
  ];
  return (
    <div className="container mx-auto px-5">
      <Breadcrumbs items={breadcrumbs} />

      <h2 className="font-semibold text-4xl mb-12">Профиль</h2>
      <div className="w-full mb-[120px] flex flex-col lg:flex-row gap-12 lg:justify-between">
        <div className="xl:max-w-[21rem] lg:max-w-[18rem] w-full">
          <ProfileLinks />
        </div>
        <OrdersTable />
      </div>
    </div>
  );
}
