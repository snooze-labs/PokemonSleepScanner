import { FixedArray } from '../../gameData/commonTypes';
import { IngredientID } from '../../gameData/ingredients/ingredients';
import { PokemonID } from '../../gameData/pokemon/pokemon';
import { SubSkillID } from '../../gameData/skills/subSkills';

/**
 * Represents a Pokemon stored in the inventory.
 */
export interface IPokemon {
  speciesID: PokemonID;
  level: number;
  mainSkillLevel: number;
  subskills: FixedArray<SubSkillID, 6>;
  isShiny: boolean;
}

/**
 * Represents the current inventory of ingredients.
 */
export type IngredientCounter = { [key in IngredientID]?: number };
