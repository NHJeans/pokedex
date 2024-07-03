"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-4 max-w-lg w-full relative">
        <button onClick={handleClose} className="absolute top-5 left-5 m-4 text-gray-700">
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
