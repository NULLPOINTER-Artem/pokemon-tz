import { GenericAbortSignal } from 'axios';
import axios from '../index';
import { getIdFromURL } from '../../utils/utils';
import { PokemonsResponse, PokemonTypeResponse, SinglePokemon } from '../types';

export type GetPokemonsParamsType = {
  limit: number,
  offset: number,
  signal?: GenericAbortSignal
}

export const getPokemons = async ({ limit, offset, signal }: GetPokemonsParamsType) => {
  try {
    const response = await axios.get<PokemonsResponse>(`/pokemon?limit=${limit}&offset=${offset}`, {
      signal,
    });

    return response;
  } catch (error: any) {
    console.error(error);
  }
};

export type GetPokemonByTypeParamsType = {
  type: number,
  signal?: GenericAbortSignal
}

export const getPokemonsByType = async ({ type, signal }: GetPokemonByTypeParamsType) => {
  try {
    const response = await axios.get<PokemonTypeResponse>(`/type/${type}`, {
      signal,
    });

    if (response && response.data) {
      return response.data.pokemon.map((item) => item.pokemon);
    }

    return [];
  } catch (error: any) {
    console.error(error);
  }
};

export type GetPokemonByNameParamsType = {
  name: string | undefined,
  signal?: GenericAbortSignal
}

export const getPokemonByName = async ({ name, signal }: GetPokemonByNameParamsType) => {
  try {
    if (name) {
      const response = await axios.get<SinglePokemon>(`/pokemon/${name}`, {
        signal,
      });

      return response;
    }

    throw new Error(`getPokemonByName - the parameter 'name' have to be a string, but got ${typeof name}`)
  } catch (error: any) {
    console.error(error);
  }
};

export type GetPokemonTypesParamsType = {
  signal?: GenericAbortSignal
}

export type TransformedPokemonTypes = {
  id: number,
  name: string,
  url: string,
}

export const getPokemonTypes = async ({ signal }: GetPokemonTypesParamsType) => {
  try {
    const response = await axios.get<PokemonsResponse>(`/type`, {
      signal,
    });

    if (response && response.data && response.status === 200) {
      const transformedPokemonTypes: TransformedPokemonTypes[] = response
        .data.results.map((item) => {
          return {
            name: item.name,
            url: item.url,
            id: getIdFromURL(item.url),
          }
        });

      return transformedPokemonTypes;
    }

    return [];
  } catch (error: any) {
    console.error(error);
  }
};
