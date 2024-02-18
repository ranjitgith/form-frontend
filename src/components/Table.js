"use client";
import React from "react";

const Table = ({ head, row, data, editHandler, deleteHandler }) => {
  return (
    <div className="container mx-auto overflow-x-scroll">
      <table className="min-w-full bg-blue-950  border-collapse border border-gray-300">
        <thead>
          <tr>
            {head.map((heading) => (
              <th key={heading} className="border border-gray-300 px-4 py-2">
                {heading}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Edit</th>
            <th className="border border-gray-300 px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((obj, i) => (
            <tr key={"tr" + i}>
              {row.map((element, i) => (
                <td
                  className="border border-gray-300 px-4 py-2 text-center"
                  key={"td" + i}
                >
                  {obj[element]}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="px-2 py-1 bg-blue-800 rounded-md"
                  onClick={editHandler}
                  id={obj._id}
                >
                  Edit
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="px-2 py-1 bg-red-700 rounded-md"
                  onClick={deleteHandler}
                  id={obj._id}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;