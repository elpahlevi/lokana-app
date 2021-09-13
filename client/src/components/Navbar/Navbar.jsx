import React, { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Logo from "../../images/logo-lokana-min.png";
import MenuIcon from "../../icons/Menu";
import GlobeIcon from "../../icons/Globe";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { getUserInfo } from "../../api/api";

const products = [
  {
    name: "WRF Data Generator",
    link: "/wrfgen",
    description: "Generate your weather data as you wish",
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
    name: "Your Requests",
    link: "/requests",
  },
  {
    name: "Profile",
    link: "/profile",
  },
  {
    name: "Logout",
    link: "/logout",
  },
];

const navMenu = [
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Documentation",
    link: "/documentation",
  },
];

const Navbar = ({ showMenu, title }) => {
  // Get and set user when credentials valid
  const [user, setUser] = useState(null);
  const [fetchUser, setFetchUser] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserInfo();
        if (fetchUser) {
          setUser(response.data);
          return setFetchUser(false);
        }
      } catch (error) {
        setUser(null);
      }
    };
    getData();
  }, [fetchUser, setFetchUser]);

  return (
    <Popover className="relative bg-white z-10">
      {({ open }) => (
        <>
          <div className="max-w-full mx-auto px-4 lg:px-10 border-b border-gray-100">
            <div className="flex justify-between items-center py-2.5 md:justify-start md:space-x-10">
              {/* Logo */}
              <div className="flex justify-start items-center lg:w-0 lg:flex-1">
                <Link to="/" className="flex justify-between items-center">
                  <span className="sr-only">{title}</span>
                  <img className="h-10 w-11" src={Logo} alt="" />
                  <p className="text-lg font-medium uppercase text-gray-900">
                    {title}
                  </p>
                </Link>
              </div>
              {/* Menu button for mobile devices */}
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                  <span className="sr-only">Open menu</span>
                  <div aria-hidden="true" className="text-black">
                    <MenuIcon />
                  </div>
                </Popover.Button>
              </div>
              {/* Menu for desktop */}
              <DesktopMenu
                showMenu={showMenu}
                user={user}
                products={products}
                navMenu={navMenu}
                userMenu={userMenu}
              />
            </div>
          </div>
          {/* Menu for mobile devices */}
          <MobileMenu
            open={open}
            user={user}
            products={products}
            userMenu={userMenu}
            navMenu={navMenu}
          />
        </>
      )}
    </Popover>
  );
};

Navbar.defaultProps = {
  title: "Lokana",
  showMenu: true,
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  showMenu: PropTypes.bool.isRequired,
};

export default Navbar;
