import axios from "axios";
import Cookies from "js-cookie";

const {
  REACT_APP_REGISTER_API,
  REACT_APP_LOGIN_API,
  REACT_APP_USER_API,
  REACT_APP_EMAIL_API,
  REACT_APP_FORGOT_API,
  REACT_APP_RESET_API,
  REACT_APP_PRODUCTS_API,
  REACT_APP_WRFGEN_API,
} = process.env;

const register = async (data) => {
  const response = await axios.post(REACT_APP_REGISTER_API, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const login = async (data) => {
  const response = await axios.post(REACT_APP_LOGIN_API, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const userInfo = async () => {
  const response = await axios.get(REACT_APP_USER_API, {
    headers: {
      "Content-Type": "application/json",
      authorization: Cookies.get("accessToken"),
    },
    withCredentials: true,
  });
  return response;
};

const verifyEmail = async (token) => {
  const response = await axios.get(REACT_APP_EMAIL_API, {
    params: { token },
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const forgotPassword = async (email) => {
  const response = await axios.post(REACT_APP_FORGOT_API, email, {
    header: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const verifyForgotPassword = async (token) => {
  const response = await axios.get(REACT_APP_FORGOT_API, {
    params: { token },
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const resetPassword = async (data) => {
  const response = await axios.post(REACT_APP_RESET_API, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};

const getOneRequestedProduct = async (reqId) => {
  const response = await axios.get(`${REACT_APP_PRODUCTS_API}/${reqId}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: Cookies.get("accessToken"),
    },
    withCredentials: true,
  });
  return response;
};

const getAllRequestedProducts = async () => {
  const response = await axios.get(REACT_APP_PRODUCTS_API, {
    headers: {
      "Content-Type": "application/json",
      authorization: Cookies.get("accessToken"),
    },
    withCredentials: true,
  });
  return response;
};

const submitWrfgenRequest = async (data) => {
  const response = await axios.post(REACT_APP_WRFGEN_API, data, {
    headers: {
      "Content-Type": "application/json",
      authorization: Cookies.get("accessToken"),
    },
    withCredentials: true,
  });
  return response;
};

export {
  register,
  login,
  userInfo,
  verifyEmail,
  forgotPassword,
  verifyForgotPassword,
  resetPassword,
  getOneRequestedProduct,
  getAllRequestedProducts,
  submitWrfgenRequest,
};
