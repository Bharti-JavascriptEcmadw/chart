import React, { useState, useEffect } from "react";

const Table = ({ data }) => {
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of rows per page

  // Sorting and pagination logic
  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      // Sorting Name alphabetically
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    setSortedData(sorted);
  }, [data]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 bg-green-800 shadow rounded-lg">
      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
