import React from "react";
import PokemonList from "@/app/_components/PokemonList";

const Main = () => {
  return (
    <div className="relative">
      <h1 className="text-3xl font-bold my-10 text-center">포켓몬 도감</h1>
      <PokemonList />
    </div>
  );
};

export default Main;
