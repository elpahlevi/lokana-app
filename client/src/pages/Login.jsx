import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, withRouter } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import Logo from "../assets/images/logo-lokana-min.png";
import { loginSchema } from "../helpers/FormValidation";
import { login } from "../api";

const inputField = [
  {
    id: "emailAddress",
    name: "email",
    placeholder: "Email address",
    type: "email",
  },
  {
    id: "password",
    name: "password",
    placeholder: "Password",
    type: "password",
  },
];

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: joiResolver(loginSchema) });
  const history = useHistory();

  useEffect(() => {
    const authToken = Cookies.get("refreshToken");
    if (authToken && authToken !== undefined) return history.goBack();
  }, [history]);

  const onSubmit = async (data) => {
    try {
      await login(data);
      return history.push("/");
    } catch (err) {
      const errMsg = err.response.data;
      inputField.map((attr) => {
        return setError(attr.name, {
          type: "manual",
          message: errMsg,
        });
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Lokana - Login</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <div className="flex justify-center items-center flex-grow px-4 sm:px-6 lg:px-8">
          <div className="p-5 max-w-md w-full">
            <div>
              <Link to="/">
                <img
                  className="mx-auto h-14 w-16"
                  src={Logo}
                  alt="logo-lokana"
                />
              </Link>
              <h2 className="text-center text-2xl text-gray-900">Login</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md -space-y-px">
                {inputField.map((attr, index) => {
                  return (
                    <div key={index} className="py-1">
                      <label htmlFor={attr.id} className="sr-only">
                        {attr.placeholder}
                      </label>
                      <input
                        key={index}
                        id={attr.id}
                        name={attr.name}
                        type={attr.type ?? "text"}
                        className={`appearance-none relative block w-full px-3 py-2  placeholder-gray-500 rounded-md focus:outline-none focus:z-10 sm:text-sm text-gray-900 ${
                          errors[attr.name]
                            ? "border border-red-400 focus:ring-red-500 focus:border-red-500"
                            : "border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder={attr.placeholder}
                        autoComplete="off"
                        autoFocus={attr.autoFocus ?? false}
                        {...register(attr.name)}
                      />
                      {errors[attr.name]?.message && (
                        <span className="text-red-500 text-sm mt-2">
                          {errors[attr.name].message}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
