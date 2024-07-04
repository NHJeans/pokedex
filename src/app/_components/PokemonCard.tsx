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
      <div className="p-4 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 flex flex-col backdrop-blur-lg backdrop-opacity-30 border border-white">
        <div className="aspect-[2/1] w-full overflow-hidden relative rounded-full">
          <img
            src={spriteSrc}
            alt={pokemon.name}
            className="w-full h-full object-contain transition-transform duration-500 hover:rotate-6 hover:scale-125 hover:translate-y-1 shadow-2xl"
          />
        </div>
        <p className="text-center mt-2 text-lg font-bold text-black text-shadow">{pokemon.korean_name}</p>
        <p className="text-center text-black text-shadow">도감 번호: {pokemon.id}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
