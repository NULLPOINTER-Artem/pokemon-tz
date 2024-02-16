import { GenericAbortSignal } from 'axios';
import axios from '../index';
import { PokemonsResponse } from '../types';

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
