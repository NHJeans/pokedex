// /pokemons/[id]/page.tsx
import Modal from "@/app/_components/Modal";
import PokemonDetail from "@/app/_components/PokemonDetail";
import { Pokemon } from "@/app/model/pokemon.type";
import axios from "axios";
import React from "react";

const fetchPokemonDetail = async (id: string): Promise<Pokemon> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await axios.get(`${baseUrl}/pokemons/${id}`);
  return response.data;
};

const PokemonDetailPage = async ({ params }: { params: { id: string } }) => {
  const pokemon = await fetchPokemonDetail(params.id);
  return (
    <Modal>
      <PokemonDetail pokemon={pokemon} />
    </Modal>
  );
};
export default PokemonDetailPage;
