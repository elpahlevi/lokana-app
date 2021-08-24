import React, { Fragment } from "react";
import { Transition, Popover } from "@headlessui/react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo-lokana-min.png";
import CloseIcon from "../../icons/Close";

const MobileMenu = ({ open, user, products, userMenu, navMenu }) => {
  return (
    <>
      <Transition
        show={open}
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          static
          className="absolute top-0 inset-x-0 p-4 transition transform origin-top-right md:hidden z-10"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              {/* Logo and close button */}
              <div className="flex items-center justify-between">
                <div>
                  <img className="h-10 w-11" src={Logo} alt="logo-lokana" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                    <span className="sr-only">Close menu</span>
                    <div aria-hidden="true" className="text-black">
                      <CloseIcon />
                    </div>
                  </Popover.Button>
                </div>
              </div>
              {/* Products */}
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <span className="text-base font-medium text-gray-600">
                    Products
                  </span>
                  {products.map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            {/* Container */}
            <div className="py-6 px-5 space-y-6">
              {/* Useful links */}
              <div className="grid grid-cols-2">
                {navMenu.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="text-base font-medium text-gray-600 hover:text-black"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {/* If user logged in, show the user menu */}
              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center px-2">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3 space-y-1">
                      <div className="text-base font-medium leading-none text-black">
                        {user.fullName}
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
                        className="block py-2 px-2 rounded-md text-base font-medium text-gray-400 hover:text-black hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-gray-100 "
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
};

export default MobileMenu;
