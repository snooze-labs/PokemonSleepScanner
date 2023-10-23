import { FixedArray } from '../../gameData/commonTypes';
import { IngredientID } from '../../gameData/ingredients/ingredients';
import { NatureID } from '../../gameData/natures/natures';
import { PokemonID } from '../../gameData/pokemon/pokemon';
import { SubSkillID } from '../../gameData/skills/subSkills';

/**
 * Represents a Pokemon stored in the inventory.
 */
export interface IPokemon {
  speciesID: PokemonID;
  level: number;
  baseMainSkillLevel: number;
  nature: NatureID;
  ingredients: FixedArray<IngredientID, 3>;
  subskills: FixedArray<SubSkillID, 5>;
  isShiny: boolean;
}

/**
 * Represents the current inventory of ingredients.
 */
export type IngredientCounter = { [key in IngredientID]?: number };
