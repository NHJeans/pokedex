/* eslint-disable @next/next/no-img-element */

import { Pokemon } from "@/app/model/pokemon.type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PokemonCardInterface {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardInterface) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const spriteSrc = pokemon.sprites.other.dream_world.front_default || pokemon?.sprites?.front_default || undefined;
  return (
    <Link href={`/pokemons/${pokemon.id}?page=${currentPage}`}>
      <div className="w-4/5 max-w-xs rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 flex flex-col backdrop-blur-lg backdrop-opacity-30 border border-white aspect-[10/11] justify-center items-center">
        <div className="aspect-square w-3/5 overflow-hidden relative flex justify-center items-center">
          <img src={spriteSrc} alt={pokemon.name} className="w-full h-full object-contain " />
        </div>
        <div className="flex flex-row justify-center mt-5">
          <p className="text-sm text-black text-shadow mr-2">No: {pokemon.id}</p>
          <p className="text-sm font-bold text-black text-shadow">{pokemon.korean_name}</p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
