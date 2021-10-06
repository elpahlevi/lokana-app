import React from "react";
import { Helmet } from "react-helmet-async";
import { EmojiSadIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Lokana - Not Found</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="bg-white flex justify-center items-center flex-grow px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-gray-600 items-center justify-center">
              <EmojiSadIcon className="w-14 h-14 mx-auto" />
              <h2 className="mt-6 text-center text-3xl font-medium text-gray-900 font-mono">
                Sorry
              </h2>
              <p className="mt-2 text-center text-sm font-medium text-gray-500">
                The page you are looking for is not found (404).
              </p>
            </div>
            <div>
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => history.push("/")}
              >
                Back to homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
