import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { wrfgenRequestFormSchema } from "../helpers/FormValidation";
import { joiResolver } from "@hookform/resolvers/joi";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import PolygonDrawer from "../components/PolygonDrawer";
import SubmitPopup from "../components/Popup";
import WrfgenRequestForm from "../components/Modal/Content/WrfgenRequestModal";
import { submitWrfgenRequest } from "../api";

const WrfGen = () => {
  const featureRefs = useRef();
  const [open, setOpen] = useState(false);
  const [domain, setDomain] = useState({});
  const [openSubmittedModal, setOpenSubmittedModal] = useState(false);
  const [submitAnimation, setSubmitAnimation] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(wrfgenRequestFormSchema),
  });

  const onCreated = (e) => {
    const features = featureRefs.current;
    if (features.getLayers().length > 1) {
      // For later development, use styled notification to show warning message
      alert("Only one polygon are allowed to draw");
      return features.removeLayer(e.layer);
    }
    const { lat: maxLat, lng: maxLon } = features.getBounds().getNorthEast();
    const { lat: minLat, lng: minLon } = features.getBounds().getSouthWest();
    const wrfDomain = { maxLat, maxLon, minLat, minLon };
    return setDomain(wrfDomain);
  };

  // When user cancel, clear the domain
  const onCancel = () => {
    featureRefs.current.closePopup();
    featureRefs.current.clearLayers();
    setOpen(false);
    reset();
    return setDomain({});
  };

  // When user submit, show request form
  const onCreateRequest = () => {
    return setOpen(true);
  };

  const onSuccess = () => {
    setTimeout(() => {
      featureRefs.current.closePopup();
      featureRefs.current.clearLayers();
      setOpenSubmittedModal(true);
      setDomain({});
      setSubmitAnimation(false);
    }, 3000);
  };

  const onSubmitRequest = async ({
    variables,
    format,
    resolution,
    startDate,
    endDate,
    startHours,
    endHours,
    purpose,
  }) => {
    const wrfVar = variables.filter((v) => v !== false);
    const data = {
      createdBy: Cookies.get("uid"),
      product: "WRFGen",
      variables: wrfVar,
      format,
      resolution,
      simDate: {
        startDate,
        endDate,
        startHours,
        endHours,
      },
      purpose,
      domain,
    };
    try {
      await submitWrfgenRequest(data);
      setSubmitAnimation(true);
      return onSuccess();
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Lokana - WRF Data Generator</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar title="WRFGen" />
        <div className="flex justify-center items-center flex-grow relative">
          <Map>
            <PolygonDrawer featureRefs={featureRefs} onCreated={onCreated}>
              <SubmitPopup
                onCancel={onCancel}
                onCreateRequest={onCreateRequest}
              />
            </PolygonDrawer>
            <WrfgenRequestForm
              open={open}
              setOpen={setOpen}
              errors={errors}
              reset={reset}
              handleSubmit={handleSubmit(onSubmitRequest)}
              register={register}
              onCancel={onCancel}
              submitAnimation={submitAnimation}
              openSubmittedModal={openSubmittedModal}
              setOpenSubmittedModal={setOpenSubmittedModal}
            />
          </Map>
        </div>
      </div>
    </>
  );
};

export default withRouter(WrfGen);
