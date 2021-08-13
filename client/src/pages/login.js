import React, { useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import Navbar from "../components/Navbar/Navbar";
import Logo from "../images/logo-lokana-min.png";
import { LoginSchema } from "../helpers/FormValidation";
import { login } from "../api/api";

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
  } = useForm({
    resolver: joiResolver(LoginSchema),
  });
  const history = useHistory();

  useEffect(() => {
    const authToken = Cookies.get("refreshToken");
    if (authToken && authToken !== undefined) return history.goBack();
  }, [history]);

  const onSubmit = async (submittedData) => {
    try {
      await login(submittedData);
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
        <Navbar showMenu={false} />
        <div className="bg-gray-50 flex justify-center items-center flex-grow pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-20 w-auto"
                src={Logo}
                alt="logo-lokana"
              />
              <h2 className="mt-6 text-center text-3xl font-medium text-gray-900 font-mono">
                Login
              </h2>
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
                            : "border border-gray-300  focus:ring-indigo-500 focus:border-indigo-500"
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
                    to="/"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
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
