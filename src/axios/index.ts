import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const token = process.env.NEXT_PUBLIC_API_KEY;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(async (config) => {
  if (token) {
    config.headers["Token"] = token; 
  }if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
