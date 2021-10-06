import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import Navbar from "../components/Navbar";
import { verifyEmail } from "../api";

const EmailVerification = (props) => {
  const { token } = props.match.params;
  const [valid, setValid] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const check = async () => {
      const response = await verifyEmail(token);
      if (response.status !== 200) return setValid(false);
      return setValid(true);
    };
    check();
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Lokana - Email Verification</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="bg-white flex justify-center items-center flex-grow px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {valid ? (
              <>
                <div className="text-green-600 items-center justify-center">
                  <CheckCircleIcon className="w-14 h-14 mx-auto" />
                  <h2 className="mt-6 text-center text-3xl font-medium text-gray-900 font-mono">
                    Success
                  </h2>
                  <p className="mt-2 text-center text-sm font-medium text-gray-500">
                    Thank You! Your account has been verified. You can continue
                    access our product by press the button below
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => history.push("/")}
                  >
                    Go to homepage
                  </button>
                </div>
              </>
            ) : (
              <div className="text-red-600 items-center justify-center">
                <XCircleIcon className="w-14 h-14 mx-auto" />
                <h2 className="mt-6 text-center text-3xl font-medium text-gray-900 font-mono">
                  Failed
                </h2>
                <p className="mt-2 text-center text-sm font-medium text-gray-500">
                  Sorry, the link is no longer valid. Try sending request again.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
