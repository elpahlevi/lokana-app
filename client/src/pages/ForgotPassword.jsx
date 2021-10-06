import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { forgotPasswordSchema } from "../helpers/FormValidation";
import Logo from "../assets/images/logo-lokana-min.png";
import { forgotPassword } from "../api";
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
        <title>Lokana - Forgot Password</title>
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
              <h2 className="text-center text-2xl text-gray-900">
                Forgot Password
              </h2>
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
                        : "border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
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
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send reset link
                </button>
              </div>
            </form>
            <SuccessModal
              open={open}
              close={() => {
                setOpen(false);
                return history.push("/");
              }}
              title="Request submitted"
              message="Check your email for further information"
              btnText="Go to homepage"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
