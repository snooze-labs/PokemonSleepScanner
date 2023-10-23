/**
 * All known nature IDs.
 */
export enum NatureID {
  Lonely = 'Lonely',
  Adamant = 'Adamant',
  Naughty = 'Naughty',
  Brave = 'Brave',
  Bold = 'Bold',
  Impish = 'Impish',
  Lax = 'Lax',
  Relaxed = 'Relaxed',
  Modest = 'Modest',
  Mild = 'Mild',
  Rash = 'Rash',
  Quiet = 'Quiet',
  Calm = 'Calm',
  Gentle = 'Gentle',
  Careful = 'Careful',
  Sassy = 'Sassy',
  Timid = 'Timid',
  Hasty = 'Hasty',
  Jolly = 'Jolly',
  Naive = 'Naive',
  Bashful = 'Bashful',
  Hardy = 'Hardy',
  Docile = 'Docile',
  Quirky = 'Quirky',
  Serious = 'Serious',
}

/**
 * Represents a nature in Pokemon Sleep.
 */
export interface INatureData {
  name: string;
  helpFrequencyIncreasePercent?: 10 | -10;
  energyRecoveryIncreasePercent?: 20 | -20;
  skillTriggerIncreasePercent?: 20 | -20;
  ingredientFindIncreasePercent?: 10 | -10;
  expGainIncreasePercent?: 20 | -20;
}

/**
 * Map of all known main skills.
 */
export const Natures: { [key in NatureID]: INatureData } = {
  [NatureID.Lonely]: {
    name: 'Lonely',
    helpFrequencyIncreasePercent: 10,
    energyRecoveryIncreasePercent: -20,
  },
  [NatureID.Adamant]: {
    name: 'Adamant',
    helpFrequencyIncreasePercent: 10,
    ingredientFindIncreasePercent: -10,
  },
  [NatureID.Naughty]: {
    name: 'Naughty',
    helpFrequencyIncreasePercent: 10,
    skillTriggerIncreasePercent: -20,
  },
  [NatureID.Brave]: {
    name: 'Brave',
    helpFrequencyIncreasePercent: 10,
    expGainIncreasePercent: -20,
  },
  [NatureID.Bold]: {
    name: 'Bold',
    energyRecoveryIncreasePercent: 20,
    helpFrequencyIncreasePercent: -10,
  },
  [NatureID.Impish]: {
    name: 'Impish',
    energyRecoveryIncreasePercent: 20,
    ingredientFindIncreasePercent: -10,
  },
  [NatureID.Lax]: {
    name: 'Lax',
    energyRecoveryIncreasePercent: 20,
    skillTriggerIncreasePercent: -20,
  },
  [NatureID.Relaxed]: {
    name: 'Relaxed',
    energyRecoveryIncreasePercent: 20,
    expGainIncreasePercent: -20,
  },
  [NatureID.Modest]: {
    name: 'Modest',
    ingredientFindIncreasePercent: 10,
    helpFrequencyIncreasePercent: -10,
  },
  [NatureID.Mild]: {
    name: 'Mild',
    ingredientFindIncreasePercent: 10,
    energyRecoveryIncreasePercent: -20,
  },
  [NatureID.Rash]: {
    name: 'Rash',
    ingredientFindIncreasePercent: 10,
    skillTriggerIncreasePercent: -20,
  },
  [NatureID.Quiet]: {
    name: 'Quiet',
    ingredientFindIncreasePercent: 10,
    expGainIncreasePercent: -20,
  },
  [NatureID.Calm]: {
    name: 'Calm',
    skillTriggerIncreasePercent: 20,
    helpFrequencyIncreasePercent: -10,
  },
  [NatureID.Gentle]: {
    name: 'Gentle',
    skillTriggerIncreasePercent: 20,
    energyRecoveryIncreasePercent: -20,
  },
  [NatureID.Careful]: {
    name: 'Careful',
    skillTriggerIncreasePercent: 20,
    ingredientFindIncreasePercent: -10,
  },
  [NatureID.Sassy]: {
    name: 'Sassy',
    skillTriggerIncreasePercent: 20,
    expGainIncreasePercent: -20,
  },
  [NatureID.Timid]: {
    name: 'Timid',
    expGainIncreasePercent: 20,
    helpFrequencyIncreasePercent: -10,
  },
  [NatureID.Hasty]: {
    name: 'Hasty',
    expGainIncreasePercent: 20,
    energyRecoveryIncreasePercent: -20,
  },
  [NatureID.Jolly]: {
    name: 'Jolly',
    expGainIncreasePercent: 20,
    ingredientFindIncreasePercent: -10,
  },
  [NatureID.Naive]: {
    name: 'Naive',
    expGainIncreasePercent: 20,
    skillTriggerIncreasePercent: -20,
  },
  [NatureID.Bashful]: {
    name: 'Bashful',
  },
  [NatureID.Hardy]: {
    name: 'Hardy',
  },
  [NatureID.Docile]: {
    name: 'Docile',
  },
  [NatureID.Quirky]: {
    name: 'Quirky',
  },
  [NatureID.Serious]: {
    name: 'Serious',
  },
};

/**
 * Helper to get nature data by ID.
 */
export function getNatureData(id: NatureID) {
  return Natures[id];
}
