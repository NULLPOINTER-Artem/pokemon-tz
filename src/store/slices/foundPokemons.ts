import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Pokemon = {
  id: number,
  name: string
};

interface IPokemonState {
  pokemons: Pokemon[],
};

const initialState: IPokemonState = {
  pokemons: [],
};

export const FoundPokemons = createSlice({
  name: 'foundPokemon',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.pokemons.push(action.payload);
    }
  },
});

export default FoundPokemons.reducer;
export const {
  addPokemon,
} = FoundPokemons.actions;
