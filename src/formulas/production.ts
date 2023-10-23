import { IPokemon } from '../common/store/types';
import {
  BerryID,
  getBerryByPokemonType,
  getBerryData,
} from '../gameData/berries/berries';
import { FixedArray, PokemonSpecialty } from '../gameData/commonTypes';
import { getNatureData } from '../gameData/natures/natures';
import { getPokemonData } from '../gameData/pokemon/pokemon';
import {
  MainSkillID,
  getMainSkillData,
  metronome,
} from '../gameData/skills/mainSkills';
import { SubSkillID, getSubSkillData } from '../gameData/skills/subSkills';
import { IProductionEnv, IProductionResult } from './types';

/**
 * Returns the available subskills.
 */
export function getAvailableSubSkills(pokemon: IPokemon) {
  const subSkills: SubSkillID[] = [];
  if (pokemon.level >= 10) {
    subSkills.push(pokemon.subskills[0]);
  }
  if (pokemon.level >= 25) {
    subSkills.push(pokemon.subskills[1]);
  }
  if (pokemon.level >= 50) {
    subSkills.push(pokemon.subskills[2]);
  }
  if (pokemon.level >= 75) {
    subSkills.push(pokemon.subskills[3]);
  }
  if (pokemon.level === 100) {
    subSkills.push(pokemon.subskills[4]);
  }
  return subSkills;
}

/**
 * Computes the actual speed of help for a Pokemon.
 */
export function computeActualSpeedOfHelpInSeconds({
  pokemon,
  energy,
  teamHelpBonusPercent,
}: {
  pokemon: IPokemon;
  energy?: number;
  teamHelpBonusPercent?: number;
}) {
  let subSkillHelp = teamHelpBonusPercent ?? 0;
  for (const subSkill of getAvailableSubSkills(pokemon)) {
    const subSkillData = getSubSkillData(subSkill);
    subSkillHelp += subSkillData.selfHelpFrequencyIncreasePercent ?? 0;
  }
  // cap at 35%
  subSkillHelp = Math.max(subSkillHelp, 35);

  const naturePercent =
    getNatureData(pokemon.nature).helpFrequencyIncreasePercent ?? 0;

  const baseFrequency = getPokemonData(pokemon.speciesID).baseFrequency;
  const baseFrequencyInSeconds =
    baseFrequency.seconds +
    baseFrequency.minutes * 60 +
    baseFrequency.hours * 3600;

  const newBaseFrequencyInSeconds =
    baseFrequencyInSeconds /
    (100 + naturePercent) /
    (100 + subSkillHelp) /
    (1 + 1.5 * ((energy ?? 0) / 100)); // this is a heuristic, it needs to account for the decrease as time goes on

  return newBaseFrequencyInSeconds;
}

/**
 * Computes the actual number berries generated for a Pokemon.
 */
export function computeActualNumberBerries({ pokemon }: { pokemon: IPokemon }) {
  let subSkillHelp = 0;
  for (const subSkill of getAvailableSubSkills(pokemon)) {
    const subSkillData = getSubSkillData(subSkill);
    subSkillHelp += subSkillData.extraBerries ?? 0;
  }

  const berryFromSpecialty =
    getPokemonData(pokemon.speciesID).specialty === PokemonSpecialty.Berries
      ? 1
      : 0;

  const baseBerry = 1;
  const newBerriesFound = baseBerry + subSkillHelp + berryFromSpecialty;
  return newBerriesFound;
}

/**
 * Computes the actual number ingredients generated for a Pokemon.
 */
export function computeActualNumberIngredients({
  pokemon,
}: {
  pokemon: IPokemon;
}) {
  const ingredientFromSpecialty =
    getPokemonData(pokemon.speciesID).specialty === PokemonSpecialty.Ingredients
      ? 1
      : 0;

  const baseIngredient = 1;
  const newIngredientsFound = baseIngredient + ingredientFromSpecialty;
  return newIngredientsFound;
}

/**
 * Computes the actual find ingredient percent for a Pokemon.
 */
export function computeActualFindIngredientPercent({
  pokemon,
}: {
  pokemon: IPokemon;
}) {
  let subSkillHelp = 0;
  for (const subSkill of getAvailableSubSkills(pokemon)) {
    const subSkillData = getSubSkillData(subSkill);
    subSkillHelp += subSkillData.ingredientFindIncreasePercent ?? 0;
  }

  const naturePercent =
    getNatureData(pokemon.nature).ingredientFindIncreasePercent ?? 0;

  // TODO: this is just an approximate for now
  const basePercent = 25;
  const newFindIngredentPercent = basePercent + subSkillHelp + naturePercent;

  return newFindIngredentPercent / 100;
}

/**
 * Computes the actual main skill trigger percent for a Pokemon.
 */
export function computeActualMainSkillTriggerPercent({
  pokemon,
}: {
  pokemon: IPokemon;
}) {
  let subSkillHelp = 0;
  for (const subSkill of getAvailableSubSkills(pokemon)) {
    const subSkillData = getSubSkillData(subSkill);
    subSkillHelp += subSkillData.skillTriggerIncreasePercent ?? 0;
  }

  const naturePercent =
    getNatureData(pokemon.nature).skillTriggerIncreasePercent ?? 0;

  // TODO: this is an estimate
  const skillTriggerFromSpecialty =
    getPokemonData(pokemon.speciesID).specialty === PokemonSpecialty.Skills
      ? 20
      : 0;

  // TODO: this is just an approximate for now
  const basePercent = 2;
  const newSkillTriggerPercent =
    (basePercent *
      (100 + subSkillHelp + skillTriggerFromSpecialty + naturePercent)) /
    100;

  return newSkillTriggerPercent / 100;
}

/**
 * Computes the actual main skill trigger percent for a Pokemon.
 */
export function computeActualInventorySize({ pokemon }: { pokemon: IPokemon }) {
  let subSkillHelp = 0;
  for (const subSkill of getAvailableSubSkills(pokemon)) {
    const subSkillData = getSubSkillData(subSkill);
    subSkillHelp += subSkillData.inventoryIncrease ?? 0;
  }

  const baseInventory = getPokemonData(pokemon.speciesID).carryLimit;
  return baseInventory + subSkillHelp;
}

/**
 * Simulates a sequence of production for a Pokemon.
 */
export function simulateProduction(config: {
  pokemon: IPokemon;
  energy?: number;
  teamHelpBonusPercent?: number;
  durationInSeconds: number;
}) {
  const results: IProductionResult = {
    berriesGenerated: [],
    ingredientsGenerated: [],
    mainSkillTriggered: undefined,
    sneakySnackingBerries: [],
    inventoryRemaining: 0,
  };

  let timeRemainingInSeconds = config.durationInSeconds;
  const helpFrequencyInSeconds = computeActualSpeedOfHelpInSeconds({
    pokemon: config.pokemon,
  });
  const ingredientPercent = computeActualFindIngredientPercent({
    pokemon: config.pokemon,
  });
  const skillTriggerPercent = computeActualMainSkillTriggerPercent({
    pokemon: config.pokemon,
  });
  const inventorySize = computeActualInventorySize({
    pokemon: config.pokemon,
  });
  results.inventoryRemaining = inventorySize;

  const pokemonData = getPokemonData(config.pokemon.speciesID);
  timeRemainingInSeconds -= helpFrequencyInSeconds;

  while (timeRemainingInSeconds > 0) {
    if (results.inventoryRemaining > 0) {
      const generatedIngredient = Math.random() < ingredientPercent;
      if (generatedIngredient) {
        results.ingredientsGenerated.push();
      } else {
        results.berriesGenerated.push(getBerryByPokemonType(pokemonData.type));
      }
      const triggerSkill = Math.random() < skillTriggerPercent;
      if (triggerSkill && !results.mainSkillTriggered) {
        results.mainSkillTriggered =
          pokemonData.MainSkillID === MainSkillID.Metronome
            ? metronome()
            : pokemonData.MainSkillID;
      }
      results.inventoryRemaining -= 1;
    } else {
      results.sneakySnackingBerries.push(
        getBerryByPokemonType(pokemonData.type),
      );
    }
    timeRemainingInSeconds -= helpFrequencyInSeconds;
  }

  return results;
}

/**
 * Computes strength gain from berries.
 */
export function computeStrengthFromBerries({
  pokemon,
  berries,
  favouriteBerries,
  areaBonus,
}: {
  pokemon: IPokemon;
  berries: BerryID[];
  favouriteBerries?: FixedArray<BerryID, 3>;
  areaBonus?: number;
}) {
  let strength = 0;
  const favouriteBerriesSet = new Set(favouriteBerries ?? []);
  for (const berry of berries) {
    const berryData = getBerryData(berry);
    const berryStrength = Math.ceil(
      berryData.strengthChart[pokemon.level - 1] * (areaBonus ?? 1),
    );
    strength += favouriteBerriesSet.has(berry)
      ? 2 * berryStrength
      : berryStrength;
  }
  return strength;
}

/**
 * Computes strength gain from main skills.
 */
export function computeStrengthFromMainSkills({
  pokemon,
  mainSkills,
}: {
  pokemon: IPokemon;
  mainSkills: MainSkillID[];
}) {
  let strength = 0;
  const mainSkillLevel = pokemon.baseMainSkillLevel;
  let subSkillMainSkillIncrease = 0;
  for (const subSkill of getAvailableSubSkills(pokemon)) {
    const subSkillData = getSubSkillData(subSkill);
    subSkillMainSkillIncrease += subSkillData.mainSkillLevelUp ?? 0;
  }
  for (const mainSkill of mainSkills) {
    const mainSkillData = getMainSkillData(mainSkill);
    const chargeStrength = mainSkillData.chargeStrength?.[mainSkillLevel];
    if (Array.isArray(chargeStrength) && chargeStrength.length === 2) {
      strength += Math.floor(
        Math.random() * (chargeStrength[1] - chargeStrength[0] + 1) +
          chargeStrength[0],
      );
    }

    // TODO: handle other types
  }
  return strength;
}

export function computeStrengthFromProduction({
  pokemon,
  productionResult,
  productionEnv,
}: {
  pokemon: IPokemon;
  productionResult: IProductionResult;
  productionEnv: IProductionEnv;
}) {
  const strengthFromBerries = computeStrengthFromBerries({
    pokemon,
    berries: productionResult.berriesGenerated,
    favouriteBerries: productionEnv.favouriteBerries,
    areaBonus: productionEnv.areaBonus,
  });
  const strengthFromSneakySnacking = computeStrengthFromBerries({
    pokemon,
    berries: productionResult.sneakySnackingBerries,
    favouriteBerries: productionEnv.favouriteBerries,
    areaBonus: productionEnv.areaBonus,
  });
  const strengthFromMainSkill = computeStrengthFromMainSkills({
    pokemon,
    mainSkills: productionResult.mainSkillTriggered
      ? [productionResult.mainSkillTriggered]
      : [],
  });

  return (
    strengthFromBerries + strengthFromSneakySnacking + strengthFromMainSkill
  );
}
