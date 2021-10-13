import React, { useMemo, useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import {
  CheckIcon,
  ChevronDoubleRightIcon,
  PencilIcon,
  XIcon,
} from "@heroicons/react/outline";
import Table, {
  SelectColumnFilter,
  StatusPill,
  DetailButton,
} from "../components/Table";
import RequestDetailModal from "../components/Modal/Content/RequestDetailModal";
import { getOneRequestedProduct, getAllRequestedProducts } from "../api";
import { getHour, getFullDate, getFormat } from "../helpers/utils";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [reqData, setReqData] = useState([]);
  const [req, setReq] = useState({});
  let initialFocus = useRef(null);

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await getAllRequestedProducts();
        if (fetchData) {
          setReqData(response.data);
          return setFetchData(false);
        }
      } catch (error) {
        return setFetchData({});
      }
    };
    userData();
  }, [fetchData]);

  const numReq = (status) => {
    return reqData
      .map((item) => item.status === status)
      .filter((val) => val === true).length;
  };

  const requestStats = [
    {
      name: "Created",
      total: reqData.map((item) => item.status).length,
      icon: PencilIcon,
      iconColor: "bg-blue-300",
    },
    {
      name: "Ongoing",
      total: numReq("ongoing"),
      icon: ChevronDoubleRightIcon,
      iconColor: "bg-yellow-300",
    },
    {
      name: "Finished",
      total: numReq("finished"),
      icon: CheckIcon,
      iconColor: "bg-green-300",
    },
    {
      name: "Rejected",
      total: numReq("rejected"),
      icon: XIcon,
      iconColor: "bg-red-300",
    },
  ];

  const reqTable = reqData.map((item) => {
    return {
      id: item._id,
      products: item.product,
      submitDate: getFullDate(item.submitDate),
      status: item.status,
    };
  });

  const data = useMemo(() => reqTable, [reqTable]);

  const openModal = async (e) => {
    const response = await getOneRequestedProduct(e.target.id);
    const {
      status,
      product,
      format,
      resolution,
      finishedDate,
      submitDate,
      variables,
      simDate,
      fileSize,
    } = response.data;
    const reqData = {
      status,
      product,
      format: getFormat(format),
      resolution,
      submitDate: getFullDate(submitDate),
      finishedDate: finishedDate.split("T"),
      variables: variables.join(", ").toUpperCase(),
      startDate: getFullDate(simDate.startDate),
      endDate: getFullDate(simDate.endDate),
      startHours: getHour(simDate.startHours),
      endHours: getHour(simDate.endHours),
      fileSize,
    };
    setReq(reqData);
    return setOpen(true);
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
        Header: "Submit date",
        accessor: "submitDate",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value }) => {
          return <DetailButton id={value} onClick={openModal} />;
        },
      },
    ],
    []
  );

  const onClose = () => {
    return setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Lokana - Dashboard</title>
      </Helmet>
      <div className="flex flex-col h-screen">
        <Navbar showMenu={false} />
        <header className="bg-white shadow">
          <div className="py-4 px-8 lg:px-20">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
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
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-normal">
                          {item.name}
                        </span>
                        <span className="text-xl font-bold">{item.total}</span>
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
        {/* Detail modals */}
        <RequestDetailModal
          open={open}
          onClose={onClose}
          initialFocus={initialFocus}
          data={req}
        />
      </div>
    </>
  );
};

export default Dashboard;
