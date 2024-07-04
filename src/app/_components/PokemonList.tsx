/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "@/app/model/pokemon.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/app/_components/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
import PokemonCard from "./PokemonCard";
import SkeletonCard from "./SkeletonCard";

const TOTAL_POKEMON = 1025;
const POKEMON_PAGE = 18;

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

  useEffect(() => {
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    if (urlPage !== page) {
      setPage(urlPage);
    }
  }, [searchParams, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/?page=${newPage}`);
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-300px)]">
        <BarLoader color="#088bd1" width={300} height={20} />
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
          <Pagination totalPages={totalPages} page={page} setPage={handlePageChange} />
        </>
      )}
      {isFetching && !isPlaceholderData && <span className="fixed bottom-4 right-4">Loading...</span>}
    </div>
  );
};

export default PokemonList;
