import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { emailVerification } from "../api/api";

const EmailVerified = (props) => {
  const { verificationToken } = props.match.params;
  const [valid, setValid] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const verifyEmail = async () => {
      const response = await emailVerification(verificationToken);
      if (response.status !== 200) return setValid(false);

      return setValid(true);
    };
    verifyEmail();
  }, [verificationToken]);

  return (
    <>
      <Helmet>
        <title>Lokana - Email Verification</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar showMenu={false} />
        <div className="bg-gray-50 flex justify-center items-center flex-grow pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {valid && (
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
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => history.push("/")}
                  >
                    Go to homepage
                  </button>
                </div>
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
                    Sorry, the link is no longer valid. Try sending verification
                    email again.
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

export default EmailVerified;
