import axiosInstance from "@/axios";
import AnswersGroup from "@/components/shared/AnswersGroup";
import Banner from "@/components/shared/Banner";
import NewsGroup from "@/components/shared/NewsGroup";
import ProductsGroup from "@/components/shared/ProductsGroup";
import { IGetData } from "@/types/getDataTypes";

export default async function Home() {
  const res = await axiosInstance.get("/data", {
    params: {
      system: "Web",
    },
  });
  const data:IGetData = res.data
  console.log(data);
  
  return (
    <main>
      <Banner sliders={data.sliders} />
      <ProductsGroup products={data.products} />
      <AnswersGroup faq={data.faq} />
      <NewsGroup news={data.news} />
    </main>
  );
}
