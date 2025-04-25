import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || "مشکلی پیش آمده!";
    return Promise.reject(message);
  }
);

export default axiosInstance;
