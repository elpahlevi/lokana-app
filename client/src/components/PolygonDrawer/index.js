import React from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import tooltipText from "./tooltipText";
import PropTypes from "prop-types";

tooltipText();

const PolygonDrawer = ({ children, featureRefs, onCreated }) => {
  return (
    <FeatureGroup ref={featureRefs}>
      <EditControl
        position="topright"
        edit={{ remove: true }}
        draw={{
          circlemarker: false,
          polygon: false,
          polyline: false,
          circle: false,
          marker: false,
          rectangle: { metric: true },
        }}
        onCreated={onCreated}
      />
      {children}
    </FeatureGroup>
  );
};

PolygonDrawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PolygonDrawer;
