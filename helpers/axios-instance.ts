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

    if (newAccessToken) {
      Cookies.set("access_token", newAccessToken);
      console.log("✅ New access token set:", newAccessToken);
      return newAccessToken;
    } else {
      console.warn("⚠️ Access token not found in response:", response.data);
      Cookies.remove("access_token");
      return null;
    }
  } catch (error) {
    Cookies.remove("access_token");
    console.error("❌ Failed to refresh token:", error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken || accessToken === "undefined") {
      Cookies.remove("access_token");

      if (
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/dashboard")
      ) {
        window.location.href = "/auth/sign-in";
      }

      return config;
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
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

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }

        // Token refresh gagal, redirect
        if (typeof window !== "undefined") {
          window.location.href = "/auth/sign-in";
        }

        return Promise.reject(error);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
