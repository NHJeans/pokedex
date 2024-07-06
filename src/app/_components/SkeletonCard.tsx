import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-4/5 max-w-xs rounded-md flex flex-col shadow-lg border border-white aspect-[10/11] justify-center items-center animate-pulse">
      <div className="aspect-square w-3/5 overflow-hidden relative flex justify-center items-center">
        <div className="bg-gray-300 h-full w-full"></div>
      </div>
      <div className="flex flex-row justify-center mt-5">
        <div className="h-5 w-12 bg-gray-300 rounded mr-2"></div>
        <div className="h-5 w-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
