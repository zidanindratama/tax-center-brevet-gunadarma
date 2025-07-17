import axios from "axios";
import Cookies from "js-cookie";

export const DEV_URL = "http://localhost:3001/api";
export const PROD_URL = "https://be-brevet.tcugapps.com/api/v1";

const axiosInstance = axios.create({
  baseURL: PROD_URL,
  withCredentials: true,
});

const refreshAuthToken = async () => {
  try {
    const response = await axios.post(`${PROD_URL}/auth/refresh-token`, null, {
      withCredentials: true,
    });

    const newAccessToken = response.data.accessToken;
    Cookies.set("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = Cookies.get("access_token");

    if (accessToken === "undefined") {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      Cookies.remove("access_token");

      if (typeof window !== "undefined") {
        window.location.href = "/auth/sign-in";
      }

      return config;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAuthToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
