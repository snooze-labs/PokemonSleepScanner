import { ImageURISource } from 'react-native';
import { FixedArray } from '../commonTypes';
import { IngredientID } from '../ingredients/ingredients';

/**
 * Types of recipes.
 */
export enum RecipeType {
  Curry = 'Curry',
  Dessert = 'Dessert',
  Salad = 'Salad',
}

/**
 * Represents a recipe in Pokemon Sleep.
 */
export interface IRecipeData {
  name: string;
  description: string;
  type: RecipeType;
  ingredients: { [key in IngredientID]?: number };
  strengthLevels: FixedArray<number, 50>;
  imageSrc: ImageURISource;
}
