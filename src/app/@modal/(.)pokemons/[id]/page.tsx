"use client";
import { Pokemon } from "@/app/model/pokemon.type";
import PokemonDetail from "@/app/_components/PokemonDetail";
import Modal from "@/app/_components/Modal";
import PokemonDetailLoading from "@/app/_components/SkeletonDetail";
import { useQuery } from "@tanstack/react-query";

const fetchPokemonDetail = async (id: string): Promise<Pokemon> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/pokemons/${id}`);
  const data = await response.json();
  return data;
};
const PokemonDetailModalPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const {
    data: pokemon,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["pokemonDetail", id],
    queryFn: () => fetchPokemonDetail(id),
  });

  if (isPending) {
    return (
      <Modal>
        <PokemonDetailLoading />
      </Modal>
    );
  }

  if (isError || !pokemon) {
    return (
      <Modal>
        <p className="text-center text-red-500">포켓몬 데이터를 불러오는 데 실패했습니다.</p>
      </Modal>
    );
  }

  return (
    <Modal>
      <PokemonDetail pokemon={pokemon} />
    </Modal>
  );
};

export default PokemonDetailModalPage;
