export type Pokemon = {
  name: string,
  url: string
}

export type PokemonsResponse = {
  count: number,
  next: string,
  previous: string,
  results: Pokemon[]
}

type Ability = {
  ability: {
    name: string,
    url: string,
  },
  is_hidden: boolean,
  slot: number
}

type Version = {
  name: string,
  url: string,
}

type PokemonType = {
  slot: number,
  type: {
    name: string,
    url: string,
  }
}

type Sprite = {
  back_default: string | null,
  back_female: string | null,
  back_shiny: string | null;
  back_shiny_female: string | null,
  front_default: string | null,
  front_female: string | null,
  front_shiny: string | null,
  front_shiny_female: string | null,
}

export type SinglePokemon = {
  base_experience: number,
  abilities: Ability[],
  cries: {
    latest: string,
    legacy: string
  }[],
  forms: {
    name: string,
    url: string,
  }[],
  game_indices: {
    game_index: number,
    version: Version
  }[],
  height: number,
  weight: number,
  held_items: {
    item: {
      name: string,
      url: string,
    },
    version_details: {
      rarity: number,
      version: Version
    }[]
  }[],
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: {
    move: {
      name: string,
      url: string,
    },
    version_group_details: {
      level_learned_at: number,
      move_learn_method: {
        name: string,
        url: string,
      },
      version_group: {
        name: string,
        url: string,
      }
    }[]
  }[],
  name: string,
  order: number,
  past_abilities: Ability[],
  past_types: PokemonType[],
  types: PokemonType[],
  species: {
    name: string,
    url: string,
  },
  sprites: Sprite & {
    other: {
      dream_world: Pick<Sprite, 'front_default' | 'front_female'>,
      home: Pick<Sprite, 'front_default' | 'front_shiny' | 'front_female' | 'front_shiny_female'>,
      'official-artwork': Pick<Sprite, 'front_default' | 'front_female'>,
      showdown: Sprite
    }
  },
  stats: {
    base_stat: number,
    effort: number,
    stat: {
      name: string,
      url: string,
    }
  }[]
}
