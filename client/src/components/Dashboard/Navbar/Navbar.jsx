import React, { useState, Fragment } from "react";
import { MenuIcon, BellIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import Logo from "../../../assets/images/logo-lokana-min.png";
import Sidebar from "../Sidebar/Sidebar";

const userInitial = "R";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 w-full py-3">
        <div className="flex justify-between px-4 md:px-6 lg:px-32">
          {/* Left container */}
          <div className="flex items-center">
            {/* Menu icon */}
            <button onClick={() => setOpen(true)} className="block lg:hidden">
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
            {/* Logo */}
            <Link to="/" className="flex mx-4 items-center space-x-1">
              <img className="h-10 w-11" src={Logo} alt="logo-lokana" />
              <span className="font-medium text-base uppercase">Lokana</span>
            </Link>
            <div className="space-x-5 px-8 hidden lg:block">
              <Link
                to="/dashboard"
                className="border-b-2 border-blue-600 pb-1 text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                className="text-gray-600 hover:text-gray-800"
              >
                Settings
              </Link>
            </div>
          </div>
          {/* Right container */}
          <div className="flex items-center space-x-4">
            {/* Menu */}
            <button className="text-gray-500 hover:text-gray-700">
              <BellIcon className="w-6 h-6" aria-hidden="true" />
            </button>
            <Menu as="div" className="ml-3 relative">
              <Menu.Button className="h-10 w-10 rounded-full bg-gray-600">
                <span className="flex justify-center items-center text-white font-bold text-base">
                  {userInitial}
                </span>
              </Menu.Button>
              {/* Menu Content */}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <a
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      href="/logout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </nav>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
