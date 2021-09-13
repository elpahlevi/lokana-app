import axios from "axios";
import Cookies from "js-cookie";

const {
  REACT_APP_API_REFRESH,
  REACT_APP_API_USER,
  REACT_APP_API_LOGIN,
  REACT_APP_API_REGISTER,
  REACT_APP_API_WRFGEN,
  REACT_APP_API_EMAIL_VERIFICATION,
  REACT_APP_API_FORGOT_PASSWORD,
  REACT_APP_API_RESET_PASSWORD,
} = process.env;

// API call to refresh access token
const refreshAccessToken = async () => {
  return await axios
    .post(
      REACT_APP_API_REFRESH,
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
  const response = await axios.post(REACT_APP_API_LOGIN, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const register = async (data) => {
  const response = await axios.post(REACT_APP_API_REGISTER, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const emailVerification = async (data) => {
  const response = await axios.get(REACT_APP_API_EMAIL_VERIFICATION, {
    params: {
      token: data,
    },
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const resendEmailVerification = async (data) => {
  const response = await axios.post(
    REACT_APP_API_EMAIL_VERIFICATION,
    { _id: data },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response;
};

const forgotPassword = async (data) => {
  const response = await axios.post(REACT_APP_API_FORGOT_PASSWORD, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const resetVerification = async (data) => {
  const response = await axios.get(REACT_APP_API_RESET_PASSWORD, {
    params: {
      token: data,
    },
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response;
};

const resetPassword = async (data) => {
  const response = await axios.post(REACT_APP_API_RESET_PASSWORD, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const getUserInfo = async () => {
  const response = await axios.get(REACT_APP_API_USER, {
    headers: {
      "Content-Type": "application/json",
      authorization: Cookies.get("accessToken"),
    },
    withCredentials: true,
  });
  return response;
};

const wrfSubmitRequest = async (data) => {
  const response = await axios.post(REACT_APP_API_WRFGEN, data, {
    headers: {
      "Content-Type": "application/json",
      authorization: Cookies.get("accessToken"),
    },
    withCredentials: true,
  });
  return response;
};

export {
  refreshAccessToken,
  login,
  getUserInfo,
  register,
  emailVerification,
  resendEmailVerification,
  forgotPassword,
  resetVerification,
  resetPassword,
  wrfSubmitRequest,
};
