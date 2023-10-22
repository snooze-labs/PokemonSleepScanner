import { createSlice } from '@reduxjs/toolkit';
import { IngredientCounter } from './types';
import { IngredientID } from '../../gameData/ingredients/ingredients';

export const cookingSlice = createSlice({
  name: 'cooking',
  initialState: {
    ingredients: {} as IngredientCounter,
  },
  reducers: {
    updateIngredients: (state, { payload }: { payload: IngredientCounter }) => {
      state.ingredients = payload;
    },
    clearIngredients: state => {
      state.ingredients = {};
    },
    addIngredients: (state, { payload }: { payload: IngredientCounter }) => {
      for (const key of Object.keys(payload) as IngredientID[]) {
        if (!(key in state.ingredients)) {
          state.ingredients[key] = 0;
        }
        state.ingredients[key]! += payload[key]!;
      }
    },
    replaceIngredients: (
      state,
      { payload }: { payload: IngredientCounter },
    ) => {
      for (const key of Object.keys(payload) as IngredientID[]) {
        state.ingredients[key]! = payload[key]!;
      }
    },
  },
});

export const {
  updateIngredients,
  clearIngredients,
  addIngredients,
  replaceIngredients,
} = cookingSlice.actions;
export default cookingSlice.reducer;
