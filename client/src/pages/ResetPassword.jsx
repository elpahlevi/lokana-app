import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Link, useHistory } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/outline";
import Navbar from "../components/Navbar";
import Logo from "../assets/images/logo-lokana-min.png";
import { resetPasswordSchema } from "../helpers/FormValidation";
import { verifyForgotPassword, resetPassword } from "../api";
import SuccessModal from "../components/Modal/Content/SuccessModal";

const ResetPassword = (props) => {
  const { token } = props.match.params;
  const [valid, setValid] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const verify = async () => {
      const response = await verifyForgotPassword(token);
      if (response.status !== 200) return setValid(false);
      return setValid(true);
    };
    verify();
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(resetPasswordSchema),
  });

  const onSubmit = async ({ newPassword }) => {
    const data = { newPassword, token };
    try {
      await resetPassword(data);
      return setOpen(true);
    } catch (err) {
      console.error(`error: ${err.response.data}`);
    }
  };
  return (
    <>
      <Helmet>
        <title>Lokana - Reset password</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="bg-white flex justify-center items-center flex-grow px-4 sm:px-6 lg:px-8">
          <div className="p-5 max-w-md w-full">
            {valid && (
              <>
                <div>
                  <Link to="/">
                    <img
                      className="mx-auto h-14 w-16"
                      src={Logo}
                      alt="logo-lokana"
                    />
                  </Link>
                  <h2 className="text-center text-2xl text-gray-900">
                    Reset Password
                  </h2>
                </div>
                <form
                  className="mt-5 space-y-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="rounded-md -space-y-px">
                    <div className="py-1">
                      <label htmlFor="newPassword" className="sr-only">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        className={`appearance-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-md focus:outline-none focus:z-10 sm:text-sm text-gray-900 ${
                          errors.newPassword
                            ? "border border-red-400 focus:ring-red-500 focus:border-red-500"
                            : "border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="New password"
                        autoComplete="off"
                        autoFocus
                        {...register("newPassword")}
                      />
                      {errors.newPassword && (
                        <span className="text-red-500 text-sm mt-2">
                          {errors.newPassword.message}
                        </span>
                      )}
                    </div>
                    <div className="py-1">
                      <label htmlFor="confirmNewPassword" className="sr-only">
                        Confirm New Password
                      </label>
                      <input
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        className={`appearance-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-md focus:outline-none focus:z-10 sm:text-sm text-gray-900 ${
                          errors.confirmNewPassword
                            ? "border border-red-400 focus:ring-red-500 focus:border-red-500"
                            : "border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        type="password"
                        placeholder="Confirm New password"
                        autoComplete="off"
                        {...register("confirmNewPassword")}
                      />
                      {errors.confirmNewPassword && (
                        <span className="text-red-500 text-sm mt-2">
                          {errors.confirmNewPassword.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <SuccessModal
                  open={open}
                  close={() => {
                    setOpen(false);
                    return history.push("/");
                  }}
                  title="Success"
                  message="Your password has been changed successfully"
                  btnText="Go to homepage"
                />
              </>
            )}
            {!valid && (
              <>
                <div className="text-red-600 items-center justify-center">
                  <XCircleIcon className="w-14 h-14 mx-auto" />
                  <h2 className="mt-6 text-center text-3xl font-medium text-gray-900 font-mono">
                    Failed
                  </h2>
                  <p className="mt-2 text-center text-sm font-medium text-gray-500">
                    Sorry, the link is no longer valid. Try sending request
                    again.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
