import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  timeout: 10000,
});

const fetchWithRetry = async (url: string, retries: number = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      if (i === retries - 1 || !axios.isAxiosError(error)) {
        throw error;
      }
      console.warn(`Retrying... (${i + 1}/${retries})`);
    }
  }
};

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const pokemonData = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const speciesData = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    const koreanName = speciesData.names?.find((name: any) => name.language.name === "ko");

    const typesWithKoreanNames = await Promise.all(
      pokemonData.types.map(async (type: any) => {
        const typeData = await fetchWithRetry(type.type.url);
        const koreanTypeName = typeData.names?.find((name: any) => name.language.name === "ko")?.name || type.type.name;
        return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
      }),
    );

    const abilitiesWithKoreanNames = await Promise.all(
      pokemonData.abilities.map(async (ability: any) => {
        const abilityData = await fetchWithRetry(ability.ability.url);
        const koreanAbilityName =
          abilityData.names?.find((name: any) => name.language.name === "ko")?.name || ability.ability.name;
        return {
          ...ability,
          ability: { ...ability.ability, korean_name: koreanAbilityName },
        };
      }),
    );

    const movesWithKoreanNames = await Promise.all(
      pokemonData.moves.slice(0, 30).map(async (move: any) => {
        try {
          const moveData = await fetchWithRetry(move.move.url);
          const koreanMoveName =
            moveData.names?.find((name: any) => name.language.name === "ko")?.name || move.move.name;
          return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
        } catch (error) {
          console.error(
            `Failed to fetch move data for move ${move.move.name}: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
          return { ...move, move: { ...move.move, korean_name: move.move.name } }; // 기본값으로 설정
        }
      }),
    );

    const pokemonResponseData = {
      ...pokemonData,
      korean_name: koreanName?.name || pokemonData.name,
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
    };

    return NextResponse.json(pokemonResponseData);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching Pokemon data:", error.message);
    } else if (error instanceof Error) {
      console.error("Error fetching Pokemon data:", error.message);
    } else {
      console.error("Error fetching Pokemon data: Unknown error");
    }
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
};
