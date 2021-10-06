import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";

const Map = ({ children }) => {
  const center = [-2.548926, 120.0148634];
  return (
    <>
      <MapContainer
        center={center}
        zoom={5}
        zoomControl={false}
        className="absolute top-0 bottom-0 w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </>
  );
};

Map.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Map;
