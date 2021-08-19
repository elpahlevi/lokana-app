import axios from "axios";
import Cookies from "js-cookie";

// API call to refresh access token
const refreshAccessToken = async () => {
  return await axios
    .post(
      "/auth/refresh",
      { refreshToken: Cookies.get("refreshToken") },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    )
    .then((response) => response.data)
    .catch((error) => {
      // console.log(`Error: ${error.response.data}`);
    });
};

// API call to login
const login = async (data) => {
  const response = await axios.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const register = async (data) => {
  const response = await axios.post("/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

// API Call to fetch user info
const getUserInfo = async () => {
  const response = await axios.get("/auth/users", {
    headers: {
      "Content-Type": "application/json",
      authorization: Cookies.get("accessToken"),
    },
    withCredentials: true,
  });
  return response;
};

const wrfSubmitRequest = async (data) => {
  const response = await axios.post("/products/wrfgen", data, {
    headers: {
      "Content-Type": "application/json",
      authorization: Cookies.get("accessToken"),
    },
    withCredentials: true,
  });
  return response;
};

export { refreshAccessToken, login, getUserInfo, register, wrfSubmitRequest };
