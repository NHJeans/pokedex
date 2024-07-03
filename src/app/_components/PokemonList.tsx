/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "@/app/model/pokemon.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/app/_components/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";
import PokemonCard from "./PokemonCard";
import SkeletonCard from "./SkeletonCard";

const TOTAL_POKEMON = 1025;
const POKEMON_PAGE = 12;

const fetchPokemons = async (page: number): Promise<Pokemon[]> => {
  const response = await axios.get(`/api/pokemons`, { params: { page } });
  return response.data;
};

const PokemonList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const totalPages = Math.ceil(TOTAL_POKEMON / POKEMON_PAGE);

  useEffect(() => {
    if (page !== initialPage) {
      router.replace(`/?page=${page}`);
    }
  }, [page, router, initialPage]);

  const {
    data: pokemons = [],
    isPending,
    isError,
    error,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-300px)]">
        <BounceLoader color="#60e4a8" size={80} />
      </div>
    );

  return (
    <div className="container mx-auto px-4">
      {isError ? (
        <div>Error loading data: {error.message}</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {isPlaceholderData
              ? Array.from({ length: POKEMON_PAGE }).map((_, index) => <SkeletonCard key={index} />)
              : pokemons.map((pokemon: Pokemon) => <PokemonCard pokemon={pokemon} key={pokemon.id} />)}
          </div>
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        </>
      )}
      {isFetching && !isPlaceholderData && <span className="fixed bottom-4 right-4">Loading...</span>}
    </div>
  );
};

export default PokemonList;
