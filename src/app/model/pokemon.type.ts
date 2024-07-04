export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: Sprite;
  types: Type[];
  abilities: Ability[];
  moves: Move[];
  cries: Cry;
};
export type Sprite = {
  front_default: string | null;
  back_default: string | null;
  front_female: string | null;
  back_female: string | null;
  front_shiny: string | null;
  back_shiny: string | null;
  front_shiny_female: string | null;
  back_shiny_female: string | null;
  other: OtherSprites;
};

export type OtherSprites = {
  dream_world: {
    front_default: string | null;
    front_female: string | null;
  };
  home: {
    front_default: string | null;
    front_female: string | null;
  };
  "official-artwork": {
    front_default: string | null;
  };
};

export type Type = {
  type: {
    name: string;
    korean_name: string;
  };
};

export type Ability = {
  ability: {
    name: string;
    korean_name: string;
  };
};

export type Move = {
  move: {
    name: string;
    korean_name: string;
  };
};

export type Cry = {
  latest: string;
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
