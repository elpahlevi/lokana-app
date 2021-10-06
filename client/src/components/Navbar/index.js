import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Popover, Transition, Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  MenuIcon,
  GlobeIcon,
  XIcon,
  // BellIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../assets/images/logo-lokana-min.png";
import { userInfo } from "../../api";

const products = [
  {
    name: "WRF Data Generator",
    link: "/wrfgen",
    description: "Generate weather data from WRF Model",
    icon: GlobeIcon,
  },
  {
    name: "CMIP6 Data Generator",
    link: "/cmip6gen",
    description: "Generate your weather data using CMIP6 climate scenarios",
    icon: GlobeIcon,
  },
];

const userMenu = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Account",
    link: "/account",
  },
  {
    name: "Logout",
    link: "/logout",
  },
];

const Navbar = ({ title, showMenu, showAuth }) => {
  const [user, setUser] = useState(null);
  const [fetchUser, setFetchUser] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await userInfo();
        if (fetchUser) {
          setUser(response.data);
          return setFetchUser(false);
        }
      } catch (error) {
        return setUser(null);
      }
    };
    getUserInfo();
  }, [fetchUser, setFetchUser]);

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b-2 border-gray-100 w-full py-3 z-10"
    >
      {({ open }) => (
        <>
          {/* parent container */}
          <div className="flex justify-between px-6 lg:px-20">
            {/* Left side */}
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-1">
                <img src={Logo} alt="logo-lokana" className="h-10 w-11" />
                <span className="font-medium text-base uppercase block">
                  {title}
                </span>
              </Link>
            </div>
            {/* on login page, register page, 404 page, and dashboard page this must be set to false */}
            {showMenu && (
              // Center side
              <div className="items-center space-x-4 hidden lg:flex">
                {/* Products */}
                <Popover className="relative">
                  <Popover.Button className="flex items-center text-gray-500 hover:text-gray-700 focus:text-black">
                    Products
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-6 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-md">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {products.map((item, index) => (
                            <Link
                              key={index}
                              to={item.link}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-100"
                            >
                              <item.icon className="flex-shrink-0 h-6 w-6 text-blue-600" />
                              <div className="ml-4">
                                <p className="text-sm font-medium text-black">
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
                </Popover>
                {/* Documentation */}
                <Link
                  to="/documentation"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Documentation
                </Link>
              </div>
            )}
            {/* on login page, register page, and 404 page this must be set to false */}
            {showAuth && (
              // Right side
              <div className="flex items-center">
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden space-x-6 lg:block">
                  {user ? (
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
                                {user.name}
                              </span>
                              {/* Change to username's first letter */}
                              <span className="flex h-10 w-10 rounded-full bg-gray-600 justify-center items-center text-white font-bold text-base">
                                {user.name[0]}
                              </span>
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
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="whitespace-nowrap text-gray-500 hover:text-gray-900"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="whitespace-nowrap inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Mobile menu container */}
          <Disclosure.Panel className="my-3 lg:hidden">
            <div className="px-5 py-2">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full p-3 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md">
                      <span>Products</span>
                      <ChevronDownIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-gray-900`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2">
                      {products.map((item, index) => (
                        <Link
                          to={item.link}
                          key={index}
                          className="flex items-center p-3 rounded-md space-x-2 hover:bg-gray-100"
                        >
                          <item.icon
                            className="h-6 w-6 text-blue-600"
                            aria-hidden="true"
                          />
                          <span className="text-gray-600 text-base font-medium">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Link
                to="/"
                className="flex text-gray-900 hover:bg-gray-100 p-3 rounded-md text-base font-medium"
              >
                Documentation
              </Link>
            </div>
            {user ? (
              <div className="border-t border-gray-200 pt-6 px-6">
                <div className="flex items-center px-2">
                  <div className="flex justify-center items-center rounded-full bg-gray-600 h-10 w-10">
                    {/* Change to username's first letter */}
                    <span className="text-white font-bold text-base">
                      {user.name[0]}
                    </span>
                  </div>
                  <div className="ml-3 space-y-1">
                    <div className="text-base font-medium leading-none text-black">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {userMenu.map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      className="block p-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2 my-6 px-6">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-gray-100 "
                >
                  Login
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

Navbar.defaultProps = {
  title: "Lokana",
  showMenu: true,
  showAuth: true,
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  showMenu: PropTypes.bool.isRequired,
};

export default Navbar;
