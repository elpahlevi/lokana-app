import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  CogIcon,
  DocumentTextIcon,
  HomeIcon,
  PencilIcon,
  XIcon,
} from "@heroicons/react/outline";
import Navbar from "../components/Navbar";
import Table, { SelectColumnFilter, StatusPill } from "../components/Table";
import Logo from "../assets/images/logo-lokana-min.png";

const requestStats = [
  {
    name: "Created",
    total: 10,
    icon: PencilIcon,
    iconColor: "bg-blue-300",
  },
  {
    name: "Ongoing",
    total: 0,
    icon: ChevronDoubleRightIcon,
    iconColor: "bg-yellow-300",
  },
  {
    name: "Finished",
    total: 2,
    icon: CheckIcon,
    iconColor: "bg-green-300",
  },
  {
    name: "Rejected",
    total: 8,
    icon: XIcon,
    iconColor: "bg-red-300",
  },
];

const requestedData = () => [
  {
    products: "WRFGen",
    dateRequested: "01-01-2021",
    status: "Finished",
  },
  {
    products: "WRFGen",
    dateRequested: "01-02-2021",
    status: "Rejected",
  },
  {
    products: "CMIP6Gen",
    dateRequested: "01-03-2021",
    status: "Finished",
  },
  {
    products: "CMIP6Gen",
    dateRequested: "01-09-2021",
    status: "Ongoing",
  },
  {
    products: "WRFGen",
    dateRequested: "01-08-2021",
    status: "Finished",
  },
  {
    products: "WRFGen",
    dateRequested: "01-07-2021",
    status: "Rejected",
  },
];

const DashboardAdmin = () => {
  const DetailButton = () => {
    return (
      <button
        type="button"
        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700"
      >
        Details
      </button>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Products",
        accessor: "products",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Date requested",
        accessor: "dateRequested",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Actions",
        accessor: DetailButton,
      },
    ],
    [],
  );

  const data = useMemo(() => requestedData(), []);

  return (
    <>
      <Helmet>
        <title>Lokana - Admin Dashboard</title>
      </Helmet>
      <div className="flex flex-row">
        <aside className="hidden h-screen w-60 border-r py-3 lg:flex lg:flex-col space-y-5">
          <div className="flex items-center px-10">
            <Link className="flex items-center justify-between space-x-1">
              <img src={Logo} alt="logo-lokana" className="h-10 w-11" />
              <span className="font-medium text-base uppercase block">
                Lokana
              </span>
            </Link>
          </div>
          <ul className="flex flex-col space-y-2">
            <li className="flex items-center border-l-4 border-blue-600 p-3">
              <Link
                to="/"
                className="flex items-center justify-between space-x-2 text-gray-800 hover:text-black"
              >
                <HomeIcon className="h-5 w-5" aria-hidden="true" />
                <span className="text-base font-semibold">Home</span>
              </Link>
            </li>
            <Disclosure as="li" className="p-3 hover:text-gray-900">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full text-base font-semibold text-gray-500 hover:text-black rounded-md">
                    <div className="flex items-center justify-between space-x-2">
                      <DocumentTextIcon className="h-5 w-5" />
                      <span>Requests</span>
                    </div>
                    <ChevronDownIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-gray-900`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4 text-gray-500">
                    <ul className="space-y-5 px-6 pt-4">
                      <li className="text-sm font-medium hover:text-black">
                        <Link t0="/">WRFGen</Link>
                      </li>
                      <li className="text-sm font-medium hover:text-black">
                        <Link to="/">CMIP6Gen</Link>
                      </li>
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <li className="flex items-center p-3">
              <Link
                to="/"
                className="flex items-center justify-between space-x-2 text-gray-500 hover:text-black"
              >
                <CogIcon className="h-5 w-5" aria-hidden="true" />
                <span className="text-base font-semibold">Settings</span>
              </Link>
            </li>
          </ul>
        </aside>
        <div className="flex flex-col h-screen w-screen">
          <Navbar showMenu={false} showLogo={false} />
          <main className="px-8 py-6 lg:px-20 space-y-6">
            <div className="space-y-4">
              <span className="text-base font-semibold">
                Your requests so far...
              </span>
              {/* Card Container*/}
              <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                {/* Card */}
                {requestStats.map((item, index) => {
                  return (
                    <div
                      className="px-4 py-4 bg-white border rounded-md"
                      key={index}
                    >
                      <div className="flex flex-row items-center space-x-5">
                        <div className={`${item.iconColor} rounded-full p-3`}>
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-normal">
                            {item.name}
                          </span>
                          <span className="text-xl font-bold">
                            {item.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Table of requested data */}
            <div>
              <span className="text-base font-semibold">
                List of your requested data
              </span>
              <div className="mt-4">
                <Table columns={columns} data={data} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
