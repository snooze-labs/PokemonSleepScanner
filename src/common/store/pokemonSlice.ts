import { createSlice } from '@reduxjs/toolkit';
import { IPokemon } from './types';

/**
 * Redux slice related to Pokemon inventory state.
 */
export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonInventory: [] as IPokemon[],
  },
  reducers: {
    addPokemonToInventory: (state, { payload }: { payload: IPokemon }) => {
      state.pokemonInventory.push(payload);
    },
    clearPokemonInventory: state => {
      state.pokemonInventory = [];
    },
    updatePokemonInInventory: (
      state,
      { payload }: { payload: { index: number; pokemon: IPokemon } },
    ) => {
      const { index, pokemon } = payload;
      state.pokemonInventory[index] = pokemon;
    },
  },
});

export const {
  addPokemonToInventory,
  clearPokemonInventory,
  updatePokemonInInventory,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
