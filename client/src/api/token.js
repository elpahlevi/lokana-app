import axios from "axios";
import Cookies from "js-cookie";
const { REACT_APP_REFRESH_API } = process.env;

const genNewAccessToken = async () => {
  return await axios
    .post(
      REACT_APP_REFRESH_API,
      { refreshToken: Cookies.get("refreshToken") },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    )
    .then((response) => response.data)
    .catch((error) => console.error(`Error: ${error.response.data}`));
};

const refreshCredentials = () => {
  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get("accessToken");
      if (token) config.headers.authorization = token;
      return config;
    },
    (error) => Promise.reject(error),
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
        const accessToken = await genNewAccessToken();
        axios.defaults.headers.common["authorization"] = accessToken;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    },
  );
};

export { genNewAccessToken, refreshCredentials };
