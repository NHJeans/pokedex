export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

export interface PokemonInterface {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface SpeciesInterface {
  names: {
    language: {
      name: string;
    };
    name: string;
  }[];
}

export type Params = {
  params: {
    id: string;
  };
};
