"use client";
import React from "react";

const Table = ({ head, row, data }) => {
  console.log(head, row, data);
  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-blue-950  border-collapse border border-gray-300">
        <thead>
          <tr>
            {head.map((heading) => (
              <th key={heading} className="border border-gray-300 px-4 py-2">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((obj, i) => (
            <tr key={"tr" + i}>
              {row.map((element, i) => (
                <td className="border border-gray-300 px-4 py-2" key={"td" + i}>
                  {obj[element]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
