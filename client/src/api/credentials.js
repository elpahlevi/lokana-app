import axios from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "./api";

const refreshCredentials = () => {
  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      // Get access token from cookie
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const accessToken = await refreshAccessToken();
        axios.defaults.headers.common["authorization"] = accessToken;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};

export default refreshCredentials;
