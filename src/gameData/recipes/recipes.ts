import { IngredientID } from '../ingredients/ingredients';
import { FixedArray } from '../commonTypes';
import { CurryRecipeID, CurryRecipes } from './curries/curries';
import { DessertRecipeID, DessertRecipes } from './desserts/desserts';
import { SaladRecipeID, SaladRecipes } from './salads/salads';

/**
 * Types of recipes.
 */
export enum RecipeType {
  Curry = 'Curry',
  Dessert = 'Dessert',
  Salad = 'Salad',
}

export interface IRecipeData {
  name: string;
  description: string;
  type: RecipeType;
  ingredients: { [key in IngredientID]?: number };
  strengthLevels: FixedArray<number, 50>;
}

export const Recipes: {
  [key in CurryRecipeID | DessertRecipeID | SaladRecipeID]: IRecipeData;
} = {
  ...CurryRecipes,
  ...DessertRecipes,
  ...SaladRecipes,
};
