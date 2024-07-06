import { Pokemon } from "@/app/model/pokemon.type";
import Image from "next/image";

interface PokemonDetailProps {
  pokemon: Pokemon;
}

const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-500",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-blue-300",
  psychic: "bg-pink-500",
  bug: "bg-green-700",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-purple-800",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  const spriteSrc = pokemon.sprites.other.home.front_default ?? pokemon?.sprites?.front_default;
  if (!pokemon || !spriteSrc) {
    return (
      <div className="text-center">
        <p className="text-red-500">이 포켓몬에 대한 이미지가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 ">
      <div className="bg-white p-4">
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src={spriteSrc}
              alt={pokemon?.name}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-4 text-center ">{pokemon.korean_name}</h2>
        <p className="text-gray-600 text-center text-xl">도감번호: {pokemon.id}</p>
        <p className="text-gray-600 text-center text-xl">키: {pokemon.height / 10}m</p>
        <p className="text-gray-600 text-center text-xl">몸무게: {pokemon.weight / 10}kg</p>
        {pokemon.cries && pokemon?.cries.latest && (
          <div className="flex justify-center mt-4">
            <audio controls className="w-full max-w-xs">
              <source src={pokemon?.cries.latest} type="audio/ogg" />
            </audio>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-2xl font-bold">타입</h3>
          <div className="flex flex-wrap">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`text-xl px-4 py-2 m-1 text-white rounded-3xl ${typeColors[type.type.name.toLowerCase()]}`}
              >
                {type.type.korean_name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">특성</h3>
          <div className="flex flex-wrap">
            {pokemon.abilities.map((ability, index) => (
              <p key={index} className="mr-2 text-xl">
                {ability?.ability.korean_name}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">기술</h3>
          <div className="flex flex-wrap">
            {pokemon.moves.slice(0, 30).map((move, index) => (
              <p key={index} className="mr-2 text-xl">
                {move?.move.korean_name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
