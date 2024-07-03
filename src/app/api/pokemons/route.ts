import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import { PokemonInterface, SpeciesInterface } from "@/app/model/pokemon.type";

const POKEMON_PAGE = 12;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);

  try {
    const offset = (page - 1) * POKEMON_PAGE;
    const limit = POKEMON_PAGE;

    const allPokemonPromises: Promise<[AxiosResponse<PokemonInterface>, AxiosResponse<SpeciesInterface>]>[] =
      Array.from({ length: limit }, (_, index) => {
        const id = offset + index + 1;
        if (id <= 1025) {
          return Promise.all([
            axios.get<PokemonInterface>(`https://pokeapi.co/api/v2/pokemon/${id}`),
            axios.get<SpeciesInterface>(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
          ]);
        }
        return null;
      }).filter(
        (promise): promise is Promise<[AxiosResponse<PokemonInterface>, AxiosResponse<SpeciesInterface>]> =>
          promise !== null,
      );

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(([response, speciesResponse]) => {
      const koreanName = speciesResponse.data.names.find((name: any) => name.language.name === "ko");
      return { ...response.data, korean_name: koreanName?.name || null };
    });

    return NextResponse.json(allPokemonData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
