import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white p-4 rounded shadow animate-pulse">
      <div className="bg-gray-300 h-40 w-full rounded"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
