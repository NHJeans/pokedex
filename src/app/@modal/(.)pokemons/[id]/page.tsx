import { Pokemon } from "@/app/model/pokemon.type";
import axios from "axios";
import PokemonDetail from "@/app/_components/PokemonDetail";
import Modal from "@/app/_components/Modal";
// import { Metadata } from "next";

// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   return {
//     title: `포켓몬 도감 - ${params.id}`,
//   };
// }

const fetchPokemonDetail = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(`http://localhost:3001/api/pokemons/${id}`);
  return response.data;
};

const PokemonDetailModalPage = async ({ params }: { params: { id: string } }) => {
  const pokemon = await fetchPokemonDetail(params.id);

  return (
    <Modal>
      <PokemonDetail pokemon={pokemon} />
    </Modal>
  );
};

export default PokemonDetailModalPage;
