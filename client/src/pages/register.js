import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import Logo from "../images/logo-lokana-min.png";
import { RegisterSchema } from "../helpers/FormValidation";
import Navbar from "../components/Navbar/Navbar";
import { register as signup } from "../api/api";
import SuccessModal from "../components/Modal/Content/SuccessModal";

const inputField = [
  {
    id: "fullName",
    name: "fullName",
    placeholder: "Full name",
    autoFocus: true,
  },
  {
    id: "emailAddress",
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    id: "password",
    name: "password",
    placeholder: "Password",
    type: "password",
  },
  {
    id: "institution",
    name: "institution",
    placeholder: "Institution",
  },
  {
    id: "usagePurpose",
    name: "usagePurpose",
    placeholder: "Usage purpose",
  },
];

const Register = () => {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: joiResolver(RegisterSchema),
  });
  const history = useHistory();

  useEffect(() => {
    const authToken = Cookies.get("refreshToken");
    if (authToken && authToken !== undefined) return history.goBack();
  }, [history]);

  const onSubmit = async (submittedData) => {
    try {
      await signup(submittedData);
      return setOpen(true);
    } catch (err) {
      setError("email", {
        type: "manual",
        message: err.response.data,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Lokana - Register</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar showMenu={false} />
        <div className="bg-gray-50 flex justify-center items-center flex-grow pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img className="mx-auto h-20 w-21" src={Logo} alt="logo-lokana" />
              <h2 className="mt-6 text-center text-3xl font-medium text-gray-900 font-mono">
                Register
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md -space-y-px">
                {inputField.map((attr, index) => {
                  return attr.name === "usagePurpose" ? (
                    <div key={index} className="py-1">
                      <label htmlFor={attr.id} className="sr-only">
                        {attr.placeholder}
                      </label>
                      <textarea
                        key={index}
                        id={attr.id}
                        name={attr.name}
                        type={attr.type ?? "text"}
                        className={`appearance-none relative block w-full px-3 py-2  placeholder-gray-500 rounded-md focus:outline-none focus:z-10 sm:text-sm text-gray-900 ${
                          errors[attr.name]
                            ? "border border-red-400 focus:ring-red-500 focus:border-red-500"
                            : "border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        }`}
                        placeholder={attr.placeholder}
                        autoFocus={attr.autoFocus ?? false}
                        autoComplete="off"
                        rows={4}
                        {...register(attr.name)}
                      />
                      {errors[attr.name]?.message && (
                        <span className="text-red-500 text-sm mt-2">
                          {errors[attr.name].message}
                        </span>
                      )}
                    </div>
                  ) : (
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
                    to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Already have an account? Login
                  </Link>
                </div>
              </div>
              {/* Submit button */}
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </span>
                Register
              </button>
            </form>
            <SuccessModal
              isOpen={open}
              onClose={() => {
                setOpen(false);
                history.push("/login");
              }}
              title="Thank You"
              message="You can continue to access our products by click the login button below"
              btnText="Go to login page"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
