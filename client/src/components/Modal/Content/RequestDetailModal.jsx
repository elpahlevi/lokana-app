import React from "react";
import Modal from "..";
import { XIcon, DownloadIcon } from "@heroicons/react/outline";
import { classNames } from "../../../helpers/utils";

const RequestDetailModal = ({ open, onClose, initialFocus, data }) => {
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
      <div
        className={classNames(
          "w-full rounded",
          data.status === "created" ? "bg-blue-100" : null,
          data.status === "ongoing" ? "bg-yellow-100" : null,
          data.status === "finished" ? "bg-green-100" : null,
          data.status === "rejected" ? "bg-red-100" : null
        )}
      >
        <div className="p-2 space-y-2">
          <p
            className={classNames(
              "text-sm font-medium",
              data.status === "created" ? "text-blue-600" : null,
              data.status === "ongoing" ? "text-yellow-600" : null,
              data.status === "finished" ? "text-green-600" : null,
              data.status === "rejected" ? "text-red-600" : null
            )}
          >
            Your request is {data.status}
          </p>
          <p className="text-gray-700 text-sm text-justify">
            {data.status === "created" &&
              "Your request has been successfully submitted and is being reviewed by the admin. Your request will proceed to the next step when the admin approved it."}
            {data.status === "ongoing" &&
              "Your request is being processed and will be complete in the next 7 days."}
            {data.status === "finished" &&
              "Thank you for using Lokana. Your request has been finished and is ready to download. Check the information below for details."}
            {data.status === "rejected" &&
              "We're sorry, we couldn't process your request due to several reasons that didn't meet our terms of service"}
          </p>
        </div>
      </div>
      {/* Details */}
      <div className="flex flex-col space-y-2 px-2 mt-2">
        <div>
          <p className="text-sm">Products</p>
          <span className="text-xs text-gray-500">{data.product}</span>
        </div>
        <div>
          <p className="text-sm text-gray-700">File format</p>
          <span className="text-xs text-gray-500">{data.format}</span>
        </div>
        <div>
          <p className="text-sm text-gray-700">Resolution</p>
          <span className="text-xs text-gray-500">{data.resolution} km</span>
        </div>
        <div>
          <p className="text-sm text-gray-700">Request submitted</p>
          <span className="text-xs text-gray-500">{data.submitDate}</span>
        </div>
        {data.status === "finished" && (
          <div>
            <p className="text-sm text-gray-700">Request finished</p>
            <span className="text-xs text-gray-500">{data.finishedDate}</span>
          </div>
        )}
        <div>
          <p className="text-sm text-gray-700">Variables</p>
          <span className="text-xs text-gray-500">{data.variables}</span>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-700 mb-1">Simulation date</p>
          <span className="text-xs text-gray-500">
            Start date: {data.startDate} {data.startHours}
          </span>
          <span className="text-xs text-gray-500">
            End date: {data.endDate} {data.startHours}
          </span>
        </div>
        {data.status === "finished" && (
          <div>
            <p className="text-sm text-gray-700">File size</p>
            <span className="text-xs text-gray-500">{data.fileSize} MB</span>
          </div>
        )}
        <div>
          {data.status !== "finished" ? (
            <button
              className="flex items-center justify-center px-3 py-2 w-full border border-blue-500 rounded bg-blue-500 disabled:opacity-50"
              disabled
            >
              <DownloadIcon className="h-5 w-5 text-white" aria-hidden="true" />
              <span className="text-sm font-medium text-white">
                Download File
              </span>
            </button>
          ) : (
            <button className="flex items-center justify-center px-3 py-2 w-full border border-blue-500 rounded bg-blue-500 hover:bg-blue-600">
              <DownloadIcon className="h-5 w-5 text-white" aria-hidden="true" />
              <span className="text-sm font-medium text-white">
                Download File
              </span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RequestDetailModal;
