import React, { useMemo, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import {
  CheckIcon,
  ChevronDoubleRightIcon,
  PencilIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Helmet } from "react-helmet-async";
import Table, {
  SelectColumnFilter,
  StatusPill,
  // DetailButton,
} from "../../components/Dashboard/Table/Table";

import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Card from "../../components/Dashboard/Card/Card";
import Modal from "../../components/Modal/Modal";

const requestStats = [
  {
    name: "Created",
    total: 10,
    icon: PencilIcon,
    iconColor: "bg-blue-300",
  },
  {
    name: "Ongoing",
    total: 2,
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

const reqData = () => [
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

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  let completeButtonRef = useRef(null);

  // Request details button
  const DetailButton = () => {
    return (
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
        onClick={() => setOpen(true)}
        ref={completeButtonRef}
      >
        Details
      </button>
    );
  };

  const closeModal = () => {
    return setOpen(false);
  };
  // Table column
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
    []
  );
  const data = useMemo(() => reqData(), []);

  return (
    <>
      <Helmet>
        <title>Lokana - Dashboard</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar />
        <header className="bg-white shadow">
          <div className="py-6 px-4 sm:px-6 lg:px-36">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-36 space-y-6">
          {/* Stats */}
          <div className="space-y-4">
            <span className="text-base font-semibold">
              Your requests so far...
            </span>
            {/* Card Container*/}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              {/* Card */}
              {requestStats.map((item, index) => {
                return (
                  <Card
                    className="px-4 py-4 bg-white border rounded-md"
                    key={index}
                  >
                    <div className="flex flex-row items-center space-x-5">
                      <div className={`${item.iconColor} rounded-full p-3`}>
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-normal">
                          {item.name}
                        </span>
                        <span className="text-xl font-bold">{item.total}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          {/* Request table */}
          <div>
            <span className="text-base font-semibold">
              List of your requested data
            </span>
            <div className="mt-4">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </main>
        {/* Modal details */}
        <Modal
          open={open}
          onClose={closeModal}
          completeButtonRef={completeButtonRef}
        >
          <Modal.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Request Details
          </Modal.Title>
        </Modal>
      </div>
    </>
  );
};

export default withRouter(Dashboard);
