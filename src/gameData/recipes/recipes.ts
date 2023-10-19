import { CurryRecipeID, CurryRecipes } from './curries/curries';
import { DessertRecipeID, DessertRecipes } from './desserts/desserts';
import { SaladRecipeID, SaladRecipes } from './salads/salads';
import { IRecipeData } from './types';

/**
 * All known recipe IDs.
 */
export type RecipeID = CurryRecipeID | DessertRecipeID | SaladRecipeID;

/**
 * Map of all known recipes.
 */
export const Recipes: {
  [key in RecipeID]: IRecipeData;
} = {
  ...CurryRecipes,
  ...DessertRecipes,
  ...SaladRecipes,
};
