import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { IngredientCounter } from './types';
import { IngredientID } from '../../gameData/ingredients/ingredients';
import { PersistedData, getData, storeData } from '../asyncStorage';
import { RecipeType } from '../../gameData/recipes/types';

/**
 * Redux slice related to cooking state.
 */
export const cookingSlice = createSlice({
  name: 'cooking',
  initialState: {
    ingredients: {} as IngredientCounter,
    potSize: 999,
    recipeType: null as RecipeType | null,
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
    updatePotSize: (state, { payload }: { payload: number }) => {
      storeData(PersistedData.PotSize, payload);
      state.potSize = payload;
    },
    updateRecipeType: (state, { payload }: { payload: RecipeType | null }) => {
      storeData(PersistedData.RecipeType, payload);
      state.recipeType = payload;
    },
  },
});

/**
 * Initializes the cooking state.
 */
export async function initialize(dispatch: Dispatch) {
  const potSize = await getData(PersistedData.PotSize);
  if (potSize != null) {
    dispatch(updatePotSize(potSize));
  }
  const recipeType = await getData(PersistedData.RecipeType);
  if (recipeType != null) {
    dispatch(updateRecipeType(recipeType));
  }
}

export const {
  updateIngredients,
  clearIngredients,
  addIngredients,
  replaceIngredients,
  updatePotSize,
  updateRecipeType,
} = cookingSlice.actions;
export default cookingSlice.reducer;
