import React from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

// Import Custom tooltip text for polygon drawer component
import TooltipText from "./TooltipText";

// Invoke it
TooltipText();

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

export default PolygonDrawer;
