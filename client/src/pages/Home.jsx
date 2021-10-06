import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Lokana</title>
      </Helmet>
      <div>
        <Navbar />
        {/* Body */}
        <div className="bg-white h-96 md:h-screen flex flex-col justify-center items-center">
          <h1 className="lg:text-9xl md:text-7xl sm:text-5xl text-3xl font-black mb-14 uppercase">
            Lokana
          </h1>
          <Link
            className="py-5 px-8 bg-purple-600 text-white rounded-md text-3xl hover:bg-purple-700 transition duration-300 ease-in-out flex items-center"
            to="/"
          >
            Our Products
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
