import React from "react";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Dashboard/Navbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Lokana - Dashboard</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar />
        <header className="bg-white shadow">
          <div className="py-6 px-4 sm:px-6 lg:px-36">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="py-6 sm:px-6 lg:px-36">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                Halo Reza, selamat datang di lokana
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
