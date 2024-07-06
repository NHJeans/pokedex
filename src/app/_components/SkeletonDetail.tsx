import Image from "next/image";
import React from "react";

const PokemonDetailLoading = () => {
  return (
    <div className="container mx-auto px-4 ">
      <div className="bg-white p-4 flex flex-col items-center">
        <div className="w-32 h-32 relative flex justify-center items-center mb-4">
          <Image src="/pokeball.png" alt="Loading..." width={128} height={128} className="animate-spin" />
        </div>
        <h2 className="text-2xl font-bold mt-4 text-center text-gray-600">Loading...</h2>
      </div>
    </div>
  );
};

export default PokemonDetailLoading;
