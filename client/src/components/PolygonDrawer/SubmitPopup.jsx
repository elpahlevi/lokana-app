import React from "react";
import { Popup } from "react-leaflet";

const SubmitPopup = ({ onCancel, onCreateRequest }) => {
  return (
    <Popup className="request-popup">
      <p className="text-base text-center text-black font-medium font-sans">
        Create a new request?
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
          className="items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-normal text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={onCreateRequest}
        >
          Create
        </button>
      </div>
    </Popup>
  );
};

export default SubmitPopup;
