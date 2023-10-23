/**
 * All known sub skill IDs.
 */
export enum SubSkillID {
  BerryFindingS = 'BerryFindingS',
  DreamShardBonus = 'DreamShardBonus',
  EnergyRecoveryBonus = 'EnergyRecoveryBonus',
  HelpingBonus = 'HelpingBonus',
  HelpingSpeedM = 'HelpingSpeedM',
  HelpingSpeedS = 'HelpingSpeedS',
  IngredientFinderM = 'IngredientFinderM',
  IngredientFinderS = 'IngredientFinderS',
  InventoryUpL = 'InventoryUpL',
  InventoryUpM = 'InventoryUpM',
  InventoryUpS = 'InventoryUpS',
  ResearchEXPBonus = 'ResearchEXPBonus',
  SkillLevelUpM = 'SkillLevelUpM',
  SkillLevelUpS = 'SkillLevelUpS',
  SkillTriggerM = 'SkillTriggerM',
  SkillTriggerS = 'SkillTriggerS',
  SleepEXPBonus = 'SleepEXPBonus',
}

/**
 * Rarity of the sub skill.
 */
export enum SubSkillRarity {
  Gold = 'Gold',
  Silver = 'Silver',
  White = 'White',
}

/**
 * Represents a sub skill in Pokemon Sleep.
 */
export interface ISubSkillData {
  name: string;
  description: string;
  rarity: SubSkillRarity;
  extraBerries?: number;
  dreamShardIncreasePercent?: number;
  teamEnergyRecoveryIncreasePercent?: number;
  teamHelpFrequencyIncreasePercent?: number;
  selfHelpFrequencyIncreasePercent?: number;
  ingredientFindIncreasePercent?: number;
  inventoryIncrease?: number;
  sleepResearchExpIncreasePercent?: number;
  mainSkillLevelUp?: number;
  skillTriggerIncreasePercent?: number;
  sleepPokemonExpIncreasePercent?: number;
  upgradesTo?: SubSkillID;
}

/**
 * Map of all known sub skills.
 */
export const SubSkills: { [key in SubSkillID]: ISubSkillData } = {
  [SubSkillID.BerryFindingS]: {
    name: 'Berry Finding S',
    description:
      'Increases the number of Berries this Pokémon finds at one time by 1.',
    extraBerries: 1,
    rarity: SubSkillRarity.Gold,
  },
  [SubSkillID.DreamShardBonus]: {
    name: 'Dream Shard Bonus',
    description:
      'Boosts the number of Dream Shards you earn from sleep research by 6%.',
    dreamShardIncreasePercent: 6,
    rarity: SubSkillRarity.Gold,
  },
  [SubSkillID.EnergyRecoveryBonus]: {
    name: 'Energy Recovery Bonus',
    description:
      'Multiplies the Energy the team recovers from sleep sessions by 1.12.',
    teamEnergyRecoveryIncreasePercent: 12,
    rarity: SubSkillRarity.Gold,
  },
  [SubSkillID.HelpingBonus]: {
    name: 'Helping Bonus',
    description: 'Reduces the time needed by team members to help out by 5%.',
    teamHelpFrequencyIncreasePercent: 5,
    rarity: SubSkillRarity.Gold,
  },
  [SubSkillID.HelpingSpeedM]: {
    name: 'Helping Speed M',
    description: 'Reduces the time needed for this Pokémon to help out by 14%.',
    selfHelpFrequencyIncreasePercent: 14,
    rarity: SubSkillRarity.Silver,
  },
  [SubSkillID.HelpingSpeedS]: {
    name: 'Helping Speed S',
    description: 'Reduces the time needed for this Pokémon to help out by 7%.',
    selfHelpFrequencyIncreasePercent: 7,
    rarity: SubSkillRarity.White,
    upgradesTo: SubSkillID.HelpingSpeedM,
  },
  [SubSkillID.IngredientFinderM]: {
    name: 'Ingredient Finder M',
    description:
      'Boosts the likelihood of this Pokémon finding ingredients by 36%.',
    ingredientFindIncreasePercent: 36,
    rarity: SubSkillRarity.Silver,
  },
  [SubSkillID.IngredientFinderS]: {
    name: 'Ingredient Finder S',
    description:
      'Slightly boosts the likelihood of this Pokémon finding ingredients by 18%.',
    ingredientFindIncreasePercent: 18,
    rarity: SubSkillRarity.White,
    upgradesTo: SubSkillID.IngredientFinderM,
  },
  [SubSkillID.InventoryUpL]: {
    name: 'Inventory Up L',
    description:
      'Increases the max number of Berries and ingredients this Pokémon can have by 18.',
    inventoryIncrease: 18,
    rarity: SubSkillRarity.Silver,
  },
  [SubSkillID.InventoryUpM]: {
    name: 'Inventory Up M',
    description:
      'Increases the max number of Berries and ingredients this Pokémon can have by 12.',
    inventoryIncrease: 12,
    rarity: SubSkillRarity.Silver,
    upgradesTo: SubSkillID.InventoryUpL,
  },
  [SubSkillID.InventoryUpS]: {
    name: 'Inventory Up S',
    description:
      'Increases the max number of Berries and ingredients this Pokémon can have by 6.',
    inventoryIncrease: 6,
    rarity: SubSkillRarity.White,
    upgradesTo: SubSkillID.InventoryUpM,
  },
  [SubSkillID.ResearchEXPBonus]: {
    name: 'Research EXP Bonus',
    description: 'Boosts the EXP you earn from doing sleep research by 6%.',
    sleepResearchExpIncreasePercent: 6,
    rarity: SubSkillRarity.Gold,
  },
  [SubSkillID.SkillLevelUpM]: {
    name: 'Skill Level Up M',
    description: "Boosts the level of this Pokémon's main skill by 2.",
    mainSkillLevelUp: 2,
    rarity: SubSkillRarity.Gold,
  },
  [SubSkillID.SkillLevelUpS]: {
    name: 'Skill Level Up S',
    description: "Boosts the level of this Pokémon's main skill by 1.",
    mainSkillLevelUp: 1,
    rarity: SubSkillRarity.Silver,
    upgradesTo: SubSkillID.SkillLevelUpM,
  },
  [SubSkillID.SkillTriggerM]: {
    name: 'Skill Trigger M',
    description:
      "Boosts the chance of this Pokémon's main skill being used by 36%.",
    skillTriggerIncreasePercent: 36,
    rarity: SubSkillRarity.Silver,
  },
  [SubSkillID.SkillTriggerS]: {
    name: 'Skill Trigger S',
    description:
      "Slightly boosts the chance of this Pokémon's main skill being used by 18%.",
    skillTriggerIncreasePercent: 18,
    rarity: SubSkillRarity.White,
    upgradesTo: SubSkillID.SkillTriggerM,
  },
  [SubSkillID.SleepEXPBonus]: {
    name: 'Sleep EXP Bonus',
    description:
      'Boosts the EXP earned by the team after sleep sessions by 14%.',
    sleepPokemonExpIncreasePercent: 14,
    rarity: SubSkillRarity.Gold,
  },
};

/**
 * Helper to get sub skill data by ID.
 */
export function getSubSkillData(id: SubSkillID) {
  return SubSkills[id];
}
