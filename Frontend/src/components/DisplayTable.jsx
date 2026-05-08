import React from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-200">
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider border-r">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b ">
                <th>Sl No.</th>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="border">{index + 1}</td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-700 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-gray-50 border-t">
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-sm font-medium text-gray-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>

      <div className="h-4" /></div>
  );
};

export default DisplayTable;
