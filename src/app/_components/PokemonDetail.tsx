import Image from "next/image";
import { Pokemon } from "@/app/model/pokemon.type";

interface PokemonDetailInterface {
  pokemon: Pokemon;
}

const PokemonDetail = ({ pokemon }: PokemonDetailInterface) => {
  if (!pokemon || !pokemon.sprites || !pokemon.sprites.front_default) {
    return (
      <div className="text-center">
        <p className="text-red-500">No image available for this Pokemon</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white p-4 ">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-2xl mt-4 text-center">{pokemon.korean_name}</h2>
        <p className="text-gray-600 text-center">ID: {pokemon.id}</p>
        <div className="mt-4">
          <h3 className="text-xl">Types</h3>
          {pokemon.types.map((type, index) => (
            <p key={index}>{type.type.korean_name}</p>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-xl">Abilities</h3>
          {pokemon.abilities.map((ability, index) => (
            <p key={index}>{ability.ability.korean_name}</p>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-xl">Moves</h3>
          <div className="flex flex-wrap">
            {pokemon.moves.map((move, index) => (
              <p key={index} className="mr-2">
                {move.move.korean_name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
