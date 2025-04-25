import axiosInstance from "./axiosInstance";

type Method = "get" | "post" | "put" | "delete";

interface ApiRequestOptions {
  method: Method;
  url: string;
  params?: Record<string, any>; // برای query string
  data?: any; // برای body
  headers?: Record<string, string>; // برای header سفارشی
}

export const apiRequest = async <T = any>(
  options: ApiRequestOptions
): Promise<T> => {
  const { method, url, params, data, headers } = options;

  const response = await axiosInstance.request<T>({
    method,
    url,
    params,
    data,
    headers,
  });

  return response.data;
};
