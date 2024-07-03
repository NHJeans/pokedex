/* eslint-disable @next/next/no-img-element */

import { Pokemon } from "@/app/model/pokemon.type";
import Link from "next/link";

interface PokemonCardInterface {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardInterface) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:scale-125">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-full h-40 object-contain" />
      <p className="text-center mt-2">{pokemon.korean_name}</p>
      <p className="text-center text-gray-600">도감 번호 : {pokemon.id}</p>
      <nav>
        <Link href={`/pokemons/${pokemon.id}`}>open</Link>
      </nav>
    </div>
  );
};

export default PokemonCard;
