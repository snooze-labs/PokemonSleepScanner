import { IngredientID } from '../../gameData/ingredients/ingredients';
import { RecipeID, Recipes } from '../../gameData/recipes/recipes';
import { IRecipeData } from '../../gameData/recipes/types';

/**
 * Returns true if a recipe has the required ingredients.
 */
export function ingredientsSatisfied(
  recipe: IRecipeData,
  ingredients: { [key in IngredientID]?: number },
) {
  const ingredientsNeeded = { ...recipe.ingredients };
  for (const ingredient of Object.keys(ingredients) as IngredientID[]) {
    if (ingredient in ingredientsNeeded) {
      ingredientsNeeded[ingredient]! -= ingredients[ingredient]!;
      if (ingredientsNeeded[ingredient]! <= 0) {
        delete ingredientsNeeded[ingredient];
      }
    }
  }
  return Object.keys(ingredientsNeeded).length === 0;
}

export function ingredientsExceedPotSize(recipe: IRecipeData, potSize: number) {
  for (const ingredient of Object.keys(recipe.ingredients) as IngredientID[]) {
    potSize -= recipe.ingredients[ingredient]!;
    if (potSize <= 0) {
      return true;
    }
  }
  return false;
}

export enum SortType {
  LargestBasePointsFirst = 'LargestBasePointsFirst',
}

export function sortRecipes(recipes: RecipeID[], type?: SortType) {
  type = type ?? SortType.LargestBasePointsFirst;
  switch (type) {
    case SortType.LargestBasePointsFirst:
      return recipes.sort((a, b) => {
        return Recipes[b].strengthLevels[0] - Recipes[a].strengthLevels[0];
      });
  }
}
