import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import Logo from "../../../assets/images/logo-lokana-min.png";
import { CogIcon, HomeIcon } from "@heroicons/react/outline";

const Sidebar = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* backdrop transition */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* Container */}
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              {/* Content */}
              <div className="w-60">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="space-y-10">
                      {/* Logo */}
                      <div className="flex items-center space-x-1">
                        <img
                          className="h-8 w-9 md:h-10 md:w-11"
                          src={Logo}
                          alt="logo-lokana"
                        />
                        <Dialog.Title className="text-lg font-medium text-gray-900 uppercase">
                          Lokana
                        </Dialog.Title>
                      </div>
                      {/* Navigation */}
                      <div className="flex items-start py-8 w-full">
                        <ul className="space-y-6">
                          <li>
                            <Link
                              to="/"
                              className="flex items-center space-x-2"
                            >
                              <HomeIcon
                                className="w-6 h-6"
                                aria-hidden="true"
                              />
                              <span>Dashboard</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                            >
                              <CogIcon className="h-6 w-6" aria-hidden="true" />
                              <span>Settings</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Sidebar;
