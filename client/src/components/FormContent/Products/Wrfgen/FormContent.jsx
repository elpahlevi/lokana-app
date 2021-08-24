import React from "react";
import Modal from "../../../Modal/Modal";

const WrfRequestForm = ({
  errors,
  handleSubmit,
  register,
  onCancel,
  submitAnimation,
}) => {
  const wrfVar = ["rain", "rhum", "tmax", "tmin", "srad", "wspd"];
  const outputFormat = [
    { placeholder: "NetCDF (.nc)", value: "nc" },
    { placeholder: "GeoTIFF (.tif)", value: "tif" },
  ];
  const resolution = [2, 5, 15, 20];

  return (
    <>
      <Modal.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Request form
      </Modal.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500 mb-2">
          Fill the information below to submit your request.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <p className="text-sm text-black font-medium">1. WRF Variables</p>
            <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-2 ml-4">
              {wrfVar.map((item, index) => {
                return (
                  <label className="inline-flex items-center gap-2" key={index}>
                    <input
                      key={index}
                      type="checkbox"
                      value={item}
                      className="rounded text-indigo-600 focus:ring-transparent"
                      {...register(`variables.${index}`)}
                    />
                    <span className="select-none">{item.toUpperCase()}</span>
                  </label>
                );
              })}
            </div>
            {errors.variables?.message && (
              <span className="text-sm text-red-600 font-medium ml-4">
                {errors.variables?.message}
              </span>
            )}
          </div>
          <div className="mb-2">
            <p className="text-sm text-black font-medium">2. Save as</p>
            <div
              className="grid grid-flow-col grid-cols-2 gap-2 ml-4"
              {...register("output")}
            >
              {outputFormat.map(({ placeholder, value }, index) => {
                return (
                  <label className="inline-flex items-center gap-2" key={index}>
                    <input
                      key={index}
                      type="radio"
                      className="text-indigo-600 focus:ring-transparent"
                      name="output"
                      value={value}
                    />
                    <span className="select-none">{placeholder}</span>
                  </label>
                );
              })}
            </div>
            {errors.output?.message && (
              <span className="text-sm text-red-600 font-medium ml-4">
                {errors.output?.message}
              </span>
            )}
          </div>
          <div className="mb-2">
            <p className="text-sm text-black font-medium">3. Data resolution</p>
            <div
              className="grid grid-cols-2 gap-2 ml-4"
              {...register("resolution")}
            >
              {resolution.map((item, index) => {
                return (
                  <label className="inline-flex items-center gap-2" key={index}>
                    <input
                      key={index}
                      type="radio"
                      className="text-indigo-600 focus:ring-transparent"
                      name="resolution"
                      value={item.toString()}
                    />
                    <span className="select-none">{item.toString()} km</span>
                  </label>
                );
              })}
            </div>
            {errors.resolution?.message && (
              <span className="text-sm text-red-600 font-medium ml-4">
                {errors.resolution?.message}
              </span>
            )}
          </div>
          <div className="mb-2">
            <p className="text-sm text-black font-medium">4. Simulation date</p>
            <div className="grid grid-cols-2 gap-2 ml-4">
              <label className="block">
                <span className="text-sm text-black">Start date</span>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  {...register("startDate", { valueAsDate: true })}
                />
              </label>
              <label className="block">
                <span className="text-sm text-black">Start hours</span>
                <select
                  className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  {...register("startHours")}
                >
                  <option value="0">00:00</option>
                  <option value="6">06:00</option>
                  <option value="12">12:00</option>
                  <option value="18">18:00</option>
                </select>
              </label>
              {errors.startDate && (
                <div className="col-span-full">
                  <span className="text-sm text-red-600 font-medium">
                    {errors.startDate.message}
                  </span>
                </div>
              )}
              {errors.startHours && (
                <div className="col-span-full">
                  <span className="text-sm text-red-600 font-medium">
                    {errors.startHours.message}
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 ml-4">
              <label className="block">
                <span className="text-sm text-black">End date</span>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  {...register("endDate", { valueAsDate: true })}
                />
              </label>
              <label className="block">
                <span className="text-sm text-black">End hours</span>
                <select
                  className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  {...register("endHours")}
                >
                  <option value="0">00:00</option>
                  <option value="6">06:00</option>
                  <option value="12">12:00</option>
                  <option value="18">18:00</option>
                </select>
              </label>
              {errors.endDate && (
                <div className="col-span-full">
                  <span className="text-sm text-red-600 font-medium">
                    {errors.endDate.message}
                  </span>
                </div>
              )}
              {errors.endHours && (
                <div className="col-span-full">
                  <span className="text-sm text-red-600 font-medium">
                    {errors.endHours.message}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-black font-medium">
              5. Request purposes
            </p>
            <div className="block ml-4">
              <textarea
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 resize-none"
                rows="3"
                style={{
                  marginTop: "4px",
                  marginBottom: "0px",
                  height: "111px",
                }}
                {...register("purpose")}
              />
              {errors.purpose?.message && (
                <span className="text-sm text-red-600 font-medium">
                  {errors.purpose?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              className="inline-flex justify-start px-4 py-2 text-sm font-medium text-indigo-900 border border-transparent rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 select-none"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`inline-flex justify-end px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 select-none ${
                submitAnimation && "hover:bg-opacity-50 bg-opacity-50"
              }`}
              disabled={submitAnimation && true}
            >
              {submitAnimation && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {submitAnimation ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WrfRequestForm;
