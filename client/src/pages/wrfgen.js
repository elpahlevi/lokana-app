import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { WrfgenRequestFormSchema } from "../helpers/FormValidation";
import { joiResolver } from "@hookform/resolvers/joi";

import Navbar from "../components/Navbar/Navbar";
import Map from "../components/Map";
import PolygonDrawer from "../components/PolygonDrawer/PolygonDrawer";
import SubmitPopup from "../components/PolygonDrawer/SubmitPopup";
import Modal from "../components/Modal/Modal";
import WrfRequestForm from "../components/FormContent/Products/Wrfgen/FormContent";
import SuccessModal from "../components/Modal/Content/SuccessModal";
import { wrfSubmitRequest } from "../api/api";

const WrfGen = () => {
  const featureRefs = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [domain, setDomain] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [submitAnimation, setSubmitAnimation] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(WrfgenRequestFormSchema),
  });
  // when user draw a domain, it will check some condition
  const onCreated = (e) => {
    const features = featureRefs.current;
    // Limit user to draw only one polygon
    if (features.getLayers().length > 1) {
      // For later development, use styled notification to show warning message
      alert("Only one polygon are allowed to draw");
      return features.removeLayer(e.layer);
    }
    // get the domain coordinates and save it
    const { lat: maxLat, lng: maxLon } = features.getBounds().getNorthEast();
    const { lat: minLat, lng: minLon } = features.getBounds().getSouthWest();
    const wrfDomain = { maxLat, maxLon, minLat, minLon };
    return setDomain(wrfDomain);
  };

  // When user cancel, clear the domain
  const onCancel = () => {
    featureRefs.current.closePopup();
    featureRefs.current.clearLayers();
    setIsOpen(false);
    reset();
    return setDomain(null);
  };

  // When user submit, show request form
  const onCreateRequest = () => {
    return setIsOpen(true);
  };

  const onSuccess = () => {
    setTimeout(() => {
      featureRefs.current.closePopup();
      featureRefs.current.clearLayers();
      setOpenSuccessModal(true);
      setDomain(null);
      setSubmitAnimation(false);
    }, 3000);
  };

  const onSubmitRequest = async ({
    variables,
    output,
    resolution,
    startDate,
    endDate,
    startHours,
    endHours,
    purpose,
  }) => {
    const wrfVar = variables.filter((v) => v !== false);
    const submitted = {
      variables: wrfVar,
      output,
      resolution,
      simulationDate: {
        startDate,
        endDate,
        startHours,
        endHours,
      },
      purpose,
      domain,
    };

    try {
      wrfSubmitRequest(submitted);
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
        <Navbar title="WRF Data Generator" />
        <div className="flex justify-center items-center flex-grow relative">
          <Map>
            <PolygonDrawer featureRefs={featureRefs} onCreated={onCreated}>
              <SubmitPopup
                onCancel={onCancel}
                onCreateRequest={onCreateRequest}
              />
            </PolygonDrawer>
            <Modal
              open={isOpen}
              onClose={onCancel}
              nestedModal={
                <SuccessModal
                  isOpen={openSuccessModal}
                  title="Request Submitted"
                  message='Your request has been successfully submitted. You can check
                  the progress on "My Request" page.'
                  btnText="Go to My Request"
                  onClose={() => {
                    reset();
                    setOpenSuccessModal(false);
                    setIsOpen(false);
                  }}
                />
              }
            >
              <WrfRequestForm
                errors={errors}
                handleSubmit={handleSubmit(onSubmitRequest)}
                register={register}
                onCancel={onCancel}
                submitAnimation={submitAnimation}
              />
            </Modal>
          </Map>
        </div>
      </div>
    </>
  );
};

export default withRouter(WrfGen);
