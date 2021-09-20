import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Logo from "../assets/images/logo-lokana-min.png";
import { forgotPasswordSchema } from "../helpers/FormValidation";
import { forgotPassword } from "../api/api";
import SuccessModal from "../components/Modal/Content/SuccessModal";

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: joiResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data);
      return setOpen(true);
    } catch (err) {
      const errMsg = err.response.data;
      return setError("email", {
        type: "manual",
        message: errMsg,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Lokana - Forgot password</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar showMenu={false} />
        <div className="bg-gray-50 flex justify-center items-center flex-grow pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div>
              <img className="mx-auto h-20 w-21" src={Logo} alt="logo-lokana" />
              <h2 className="mt-6 text-center text-3xl font-medium text-gray-900 font-mono">
                Forgot Password
              </h2>
              <p className="mt-2 text-center text-sm font-medium text-gray-500">
                Enter your registered email address below. We will send you
                reset link.
              </p>
            </div>
            <form className="mt-5 space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md -space-y-px">
                <div className="py-1">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`appearance-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-md focus:outline-none focus:z-10 sm:text-sm text-gray-900 ${
                      errors.email
                        ? "border border-red-400 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-300  focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Email"
                    autoComplete="off"
                    autoFocus
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-2">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send reset link
                </button>
              </div>
            </form>
            <SuccessModal
              isOpen={open}
              onClose={() => {
                setOpen(false);
                history.push("/");
              }}
              title="Request created"
              message="Check your email for further instruction"
              btnText="Go to homepage"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
