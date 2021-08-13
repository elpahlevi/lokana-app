import React, { Fragment } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import { Link } from "react-router-dom";

import ChevronDown from "../../icons/ChevronDown";

const DesktopMenu = ({ showMenu, user, products, navMenu, userMenu }) => {
  return (
    <>
      {showMenu && (
        <>
          {/* Container */}
          <Popover.Group as="nav" className="hidden md:flex space-x-5">
            {/* Products */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`${
                      open ? "text-gray-900" : "text-gray-500"
                    } group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:ouline-none`}
                  >
                    <span>Products</span>
                    <ChevronDown
                      className={`${
                        open ? "text-gray-900" : "text-gray-500"
                      } ml-1 h-5 w-5 group-hover:text-gray-900`}
                    />
                  </Popover.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      static
                      className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {/* List of products */}
                          {products.map((item, index) => (
                            <Link
                              key={index}
                              to={item.link}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            >
                              <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            {/* Useful link */}
            {navMenu.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </Popover.Group>
          {/* If user logged in, show the user menu */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {user ? (
              <>
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-white flex text-sm rounded-ful items-center focus:outline-none space-x-3">
                          <span className="sr-only">Open user menu</span>
                          <span
                            className={`text-base font-medium hover:text-gray-900 ${
                              open ? "text-gray-900" : "text-gray-500"
                            }`}
                          >
                            {user.fullName}
                          </span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {userMenu.map((item, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <Link
                                  key={index}
                                  to={item.link}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } block px-4 py-2 text-sm text-gray-700`}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DesktopMenu;
