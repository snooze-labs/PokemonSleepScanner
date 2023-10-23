import { FixedArray } from '../commonTypes';

/**
 * All known main skill IDs.
 */
export enum MainSkillID {
  ChargeStrengthS = 'ChargeStrengthS',
  ChargeStrengthM = 'ChargeStrengthM',
  DreamShardMagnetS = 'DreamShardMagnetS',
  EnergizingCheerS = 'EnergizingCheerS',
  ChargeStrengthVariableS = 'ChargeStrengthVariableS',
  DreamShardMagnetVariableS = 'DreamShardMagnetVariableS',
  ChargeEnergyS = 'ChargeEnergyS',
  EnergyForEveryoneS = 'EnergyForEveryoneS',
  ExtraHelpfulS = 'ExtraHelpfulS',
  IngredientMagnetS = 'IngredientMagnetS',
  CookingPowerUpS = 'CookingPowerUpS',
  Metronome = 'Metronome',
}

/**
 * Represents a main skill in Pokemon Sleep.
 */
export interface IMainSkillData {
  name: string;
  description: string;
  chargeStrength?: FixedArray<number | FixedArray<number, 2>, 6>;
  dreamShards?: FixedArray<number | FixedArray<number, 2>, 6>;
  energyToRandom?: FixedArray<number, 6>;
  energyToSelf?: FixedArray<number, 6>;
  energyToTeam?: FixedArray<number, 6>;
  randomHelpTriggers?: FixedArray<number, 6>;
  randomIngredients?: FixedArray<number, 6>;
  potSizeIncrease?: FixedArray<number, 6>;
  isMetronome?: boolean;
}

/**
 * Map of all known main skills.
 */
export const MainSkills: { [key in MainSkillID]: IMainSkillData } = {
  [MainSkillID.ChargeStrengthS]: {
    name: 'Charge Strength S',
    description: "Increases Snorlax's Strength by {0}.",
    chargeStrength: [400, 569, 785, 1083, 1496, 2066],
  },
  [MainSkillID.ChargeStrengthM]: {
    name: 'Charge Strength M',
    description: "Increases Snorlax's Strength by {0}.",
    chargeStrength: [880, 1251, 1726, 2383, 3290, 4546],
  },
  [MainSkillID.DreamShardMagnetS]: {
    name: 'Dream Shard Magnet S',
    description: 'Obtain {0} Dream Shards.',
    dreamShards: [88, 125, 173, 274, 395, 568],
  },
  [MainSkillID.EnergizingCheerS]: {
    name: 'Energizing Cheer S',
    description: 'Restores {0} Energy to another Pokémon chosen at random.',
    energyToRandom: [14, 17, 22, 28, 38, 50],
  },
  [MainSkillID.ChargeStrengthVariableS]: {
    name: 'Charge Strength S',
    description: "Increases Snorlax's Strength by anywhere from {0} to {1}.",
    chargeStrength: [
      [200, 800],
      [285, 1138],
      [393, 1570],
      [542, 2166],
      [748, 2992],
      [1033, 4132],
    ],
  },
  [MainSkillID.DreamShardMagnetVariableS]: {
    name: 'Dream Shard Magnet S',
    description: 'Obtain {0} to {1} Dream Shards.',
    dreamShards: [
      [44, 176],
      [63, 250],
      [87, 346],
      [137, 548],
      [198, 790],
      [284, 1136],
    ],
  },
  [MainSkillID.ChargeEnergyS]: {
    name: 'Charge Energy S',
    description: 'Restores {0} Energy to the user.',
    energyToSelf: [12, 16, 21, 26, 33, 43],
  },
  [MainSkillID.EnergyForEveryoneS]: {
    name: 'Energy for Everyone S',
    description: 'Restores {0} Energy to each helper Pokémon on your team.',
    energyToTeam: [5, 7, 9, 11, 15, 18],
  },
  [MainSkillID.ExtraHelpfulS]: {
    name: 'Extra Helpful S',
    description:
      'Instantly gets you x{0} the usual help from a helper Pokémon.',
    randomHelpTriggers: [4, 5, 6, 7, 8, 9],
  },
  [MainSkillID.IngredientMagnetS]: {
    name: 'Ingredient Magnet S',
    description: 'Gets you {0} ingredients chosen at random.',
    randomIngredients: [6, 8, 11, 14, 17, 21],
  },
  [MainSkillID.CookingPowerUpS]: {
    name: 'Cooking Power-Up S',
    description:
      'Gives your pot room for {0} more ingredients next time you cook.',
    potSizeIncrease: [7, 10, 12, 17, 22, 27],
  },
  [MainSkillID.Metronome]: {
    name: 'Metronome',
    description: 'Uses one randomly chosen main skill.',
    isMetronome: true,
  },
};

/**
 * Helper to get main skill data by ID.
 */
export function getMainSkillData(id: MainSkillID) {
  return MainSkills[id];
}

/**
 * Generate random main skill.
 */
export function metronome(): MainSkillID {
  const allMainSkills = (Object.keys(MainSkills) as MainSkillID[]).filter(
    skill => skill !== MainSkillID.Metronome,
  );
  const generatedSkill =
    allMainSkills[Math.floor(Math.random() * allMainSkills.length)];
  return generatedSkill;
}
