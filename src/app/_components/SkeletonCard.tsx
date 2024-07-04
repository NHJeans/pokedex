import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white p-4 rounded shadow animate-pulse flex flex-col">
      <div className="aspect-[2/1] w-full overflow-hidden rounded">
        <div className="bg-gray-300 h-full w-full"></div>
      </div>
      <div className="mt-2 h-5 bg-gray-300 rounded"></div>
      <div className="mt-2 h-6 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
