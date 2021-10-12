import React, { useMemo } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import { classNames } from "../../helpers/utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "../../assets/icons";
import PageButton from "./PageButton";

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <label className="flex gap-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";
  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("created") ? "bg-blue-100 text-blue-800" : null,
        status.startsWith("ongoing") ? "bg-yellow-100 text-yellow-800" : null,
        status.startsWith("finished") ? "bg-green-100 text-green-800" : null,
        status.startsWith("rejected") ? "bg-red-100 text-red-800" : null,
      )}
    >
      {status}
    </span>
  );
}

export function DetailButton({ id, onClick }) {
  return (
    <button
      id={id}
      type="button"
      className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700"
      onClick={onClick}
    >
      Details
    </button>
  );
}

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = useTable({ columns, data }, useFilters, useSortBy, usePagination);
  return (
    <>
      {/* Filter component */}
      <div className="sm:flex sm:gap-x-2">
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null,
          ),
        )}
      </div>
      {/* Table content */}
      <div className="mt-4 flex flex-col border rounded px-4 sm:px-0">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps(),
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                            {/* Sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "defaultRenderer" ? (
                                <div className="text-sm text-gray-500">
                                  {cell.render("Cell")}
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        {/* Mobile version */}
        <div className="flex-1 flex justify-between sm:hidden">
          {/* Previous page */}
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          {/* Next page */}
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
        </div>
        {/* Screen larger than mobile devices (sm) */}
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {/* First page */}
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              {/* Previous page */}
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              {/* Next page */}
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              {/* Last page */}
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
