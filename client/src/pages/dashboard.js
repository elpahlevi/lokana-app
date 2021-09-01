import React from "react";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Lokana - Dashboard</title>
      </Helmet>
      <div className="flex flex-col h-screen bg-green-500">
        <Navbar />
        Hello world
      </div>
    </>
  );
};

export default Dashboard;
