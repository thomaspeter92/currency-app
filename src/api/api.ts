import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosParams = {
  baseURL: "https://www.floatrates.com",
};

const axiosInstance: AxiosInstance = axios.create(axiosParams);

// return data to avoid data.data access
axiosInstance.interceptors.response.use((res) => {
  if (res?.data) {
    return res.data;
  }
  return res;
});

export type ApiResponse<T> = {
  ok: boolean;
} & T;

// Main api function
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(
      url: string,
      config: AxiosRequestConfig = {}
    ): Promise<ApiResponse<T>> => axios.get(url, config),
  };
};
export default api(axiosInstance);
