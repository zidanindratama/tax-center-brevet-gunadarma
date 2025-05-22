import axios from "axios";
import Cookies from "js-cookie";

export const DEV_URL = "http://localhost:3001/api";
export const PROD_URL = "https://backend-gunakarir.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: PROD_URL,
  withCredentials: true,
});

// Refreshtoken dari cookie server
const refreshAuthToken = async () => {
  try {
    const response = await axios.post(`${PROD_URL}/auth/refresh`, null, {
      withCredentials: true,
    });

    const newAccessToken = response.data.accessToken;

    Cookies.set("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// Intercept request dan set Authorization header dengan bearer token
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept response dan coba refresh token jika diperlukan
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
