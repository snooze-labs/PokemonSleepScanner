import { IPokemon } from '../common/store/types';
import { BerryID } from '../gameData/berries/berries';
import { FixedArray } from '../gameData/commonTypes';
import { IngredientID } from '../gameData/ingredients/ingredients';
import { MainSkillID } from '../gameData/skills/mainSkills';

export interface IProductionResult {
  berriesGenerated: BerryID[];
  ingredientsGenerated: IngredientID[];
  mainSkillTriggered: MainSkillID | undefined;
  sneakySnackingBerries: BerryID[];
  inventoryRemaining: number;
}

export interface IProductionEnv {
  pokemon: FixedArray<
    {
      pokemon: IPokemon;
      energy: number;
    },
    5
  >;
  areaBonus: number;
  favouriteBerries: FixedArray<BerryID, 3>;
  duration: number;
}
