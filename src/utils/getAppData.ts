import axiosInstance from "@/axios";
import { IGetData } from "@/types/getDataTypes";

export const getAppData = async () => {
  const res = await axiosInstance.get("/data", {
    params: {
      system: "Web",
    },
  });
  const data: IGetData = res.data;
  return data;
};
