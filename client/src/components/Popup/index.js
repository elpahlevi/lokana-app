import React from "react";
import { Popup as LeafletPopup } from "react-leaflet";
import PropTypes from "prop-types";

const Popup = ({ className, onCreateRequest, onCancel }) => {
  return (
    <LeafletPopup className={className}>
      <p className="text-base text-center text-black font-medium font-sans">
        Submit a new request?
      </p>
      <div className="inline-flex items-center justify-between space-x-4 font-sans">
        <button
          type="button"
          className="items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-normal text-black hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-normal text-white bg-blue-600 hover:bg-blue-700"
          onClick={onCreateRequest}
        >
          Create
        </button>
      </div>
    </LeafletPopup>
  );
};

Popup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Popup;
