import React, { useState, useEffect } from "react";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const groupSize = 9;

  useEffect(() => {
    setCurrentGroup(Math.floor((page - 1) / groupSize));
  }, [page]);

  const handleNextGroup = () => {
    if ((currentGroup + 1) * groupSize < totalPages) {
      setCurrentGroup(currentGroup + 1);
      setPage(currentGroup * groupSize + groupSize + 1);
    }
  };

  const handlePrevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
      setPage(currentGroup * groupSize);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  return (
    <div className="flex justify-center my-14">
      <button
        onClick={handlePrevGroup}
        disabled={currentGroup === 0}
        className="px-4 py-2 mx-1 bg-emerald-400 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &#9664;&#9664;
      </button>
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="px-4 py-2 mx-1 bg-emerald-400 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &#9664;
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(pageNum => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`px-4 py-2 mx-1 rounded ${
            page === pageNum ? "bg-emerald-200 opacity-90 text-emerald-500 font-bold" : "text-black hover:bg-emerald-50"
          }`}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className="px-4 py-2 mx-1 bg-emerald-400 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &#9654;
      </button>
      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
        className="px-4 py-2 mx-1 bg-emerald-400 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &#9654;&#9654;
      </button>
    </div>
  );
};

export default Pagination;
