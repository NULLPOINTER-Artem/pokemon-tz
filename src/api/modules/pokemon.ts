import { GenericAbortSignal } from 'axios';
import axios from '../index';
import { PokemonsResponse, SinglePokemon } from '../types';

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
