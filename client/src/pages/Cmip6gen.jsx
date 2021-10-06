import React from "react";
import { Helmet } from "react-helmet-async";
import { withRouter } from "react-router-dom";

import Navbar from "../components/Navbar";
import Map from "../components/Map";

const Cmip6Gen = () => {
  return (
    <>
      <Helmet>
        <title>Lokana - CMIP6 Data Generator</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar title="CMIP6Gen" />
        <div className="flex justify-center items-center flex-grow relative">
          <Map />
        </div>
      </div>
    </>
  );
};

export default withRouter(Cmip6Gen);
