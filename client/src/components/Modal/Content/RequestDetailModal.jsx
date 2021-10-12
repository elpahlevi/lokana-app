import React from "react";
import Modal from "..";
import { XIcon, DownloadIcon } from "@heroicons/react/outline";

const RequestDetailModal = ({ open, onClose, initialFocus }) => {
  return (
    <Modal open={open} close={onClose} initialFocus={initialFocus}>
      <div className="flex justify-between items-center mb-4">
        <Modal.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Request details
        </Modal.Title>
        <button className="text-gray-600 hover:text-black" onClick={onClose}>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      {/* Status banner */}
      <div className="w-full bg-green-100 rounded">
        <div className="p-2 space-y-3">
          <p className="text-green-600 text-sm font-medium">
            Your request is finished
          </p>
          <p className="text-gray-700 text-sm text-justify">
            Thank you for using Lokana. Your request has been finished and ready
            to download. Check the information below for details.
          </p>
        </div>
      </div>
      {/* Details */}
      <div className="flex flex-col space-y-2 px-2 mt-2">
        <div>
          <p className="text-sm">Products</p>
          <span className="text-xs text-gray-500">WRFGen</span>
        </div>
        <div>
          <p className="text-sm text-gray-700">File format</p>
          <span className="text-xs text-gray-500">NetCDF (.nc)</span>
        </div>
        <div>
          <p className="text-sm text-gray-700">Resolution</p>
          <span className="text-xs text-gray-500">2 Km</span>
        </div>
        <div>
          <p className="text-sm text-gray-700">Request submitted</p>
          <span className="text-xs text-gray-500">
            Saturday, 9 October 2021
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-700">Request finished</p>
          <span className="text-xs text-gray-500">Monday, 11 October 2021</span>
        </div>
        <div>
          <p className="text-sm text-gray-700">Variables</p>
          <span className="text-xs text-gray-500">RAIN, TMAX, TMIN</span>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-700 mb-1">Simulation date</p>
          <span className="text-xs text-gray-500">
            Start date: 09 October 2021 00:00
          </span>
          <span className="text-xs text-gray-500">
            End date: 20 October 2021 00:00
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-700">File size</p>
          <span className="text-xs text-gray-500">200 MB</span>
        </div>
        <div>
          <button className="flex items-center justify-center px-3 py-2 w-full border border-blue-500 rounded bg-blue-500 hover:bg-blue-600">
            <DownloadIcon className="h-5 w-5 text-white" aria-hidden="true" />
            <span className="text-sm font-medium text-white">
              Download File
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RequestDetailModal;
