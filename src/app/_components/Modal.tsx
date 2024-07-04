"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full relative overflow-y-auto">
        <button onClick={handleClose} className="absolute top-5 left-5 m-4 text-gray-700">
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
