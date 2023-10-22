import { IngredientID } from '../../gameData/ingredients/ingredients';
import { PokemonID } from '../../gameData/pokemon/pokemon';

export interface IPokemon {
  speciesID: PokemonID;
  level: number;
  subskills: string[]; // TODO
}

export type IngredientCounter = { [key in IngredientID]?: number };
