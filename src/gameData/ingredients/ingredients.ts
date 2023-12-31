import { ImageURISource } from 'react-native';

/**
 * All known ingredient IDs.
 */
export enum IngredientID {
  BeanSausage = 'beansausage',
  FancyApple = 'fancyapple',
  FancyEgg = 'fancyegg',
  FieryHerb = 'fieryherb',
  GreengrassSoybeans = 'greengrasssoybeans',
  Honey = 'honey',
  LargeLeek = 'largeleek',
  MoomooMilk = 'moomoomilk',
  PureOil = 'pureoil',
  SlowpokeTail = 'slowpoketail',
  SnoozyTomato = 'snoozytomato',
  SoftPotato = 'softpotato',
  SoothingCacao = 'soothingcacao',
  TastyMushroom = 'tastymushroom',
  WarmingGinger = 'warmingginger',
}

/**
 * Represents an ingredient in Pokemon Sleep.
 */
export interface IIngredientData {
  name: string;
  description: string;
  basePower: number;
  shardValue: number;
  imageSrc: ImageURISource;
}

/**
 * Map of all known ingredients.
 */
export const Ingredients: { [key in IngredientID]: IIngredientData } = {
  [IngredientID.BeanSausage]: {
    name: 'Bean Sausage',
    description: 'A healthy sausage made from beans that Pokémon like to eat.',
    basePower: 103,
    shardValue: 4,
    imageSrc: require('./assets/beansausage.png'),
  },
  [IngredientID.FancyApple]: {
    name: 'Fancy Apple',
    description:
      'An apple chosen above others. It has spectacular form and a brilliant sheen.',
    basePower: 90,
    shardValue: 4,
    imageSrc: require('./assets/fancyapple.png'),
  },
  [IngredientID.FancyEgg]: {
    name: 'Fancy Egg',
    description:
      'A nutritious cooking ingredient that goes well with all sorts of seasonings.',
    basePower: 115,
    shardValue: 5,
    imageSrc: require('./assets/fancyegg.png'),
  },
  [IngredientID.FieryHerb]: {
    name: 'Fiery Herb',
    description:
      'The fiery taste of this bright-red herb will wake anyone right up.',
    basePower: 130,
    shardValue: 5,
    imageSrc: require('./assets/fieryherb.png'),
  },
  [IngredientID.GreengrassSoybeans]: {
    name: 'Greengrass Soybeans',
    description:
      'This Greengrass Isle specialty is easy to process into foods that are great for training.',
    basePower: 100,
    shardValue: 4,
    imageSrc: require('./assets/greengrasssoybeans.png'),
  },
  [IngredientID.Honey]: {
    name: 'Honey',
    description: 'A sweet honey collected by Pokémon.',
    basePower: 101,
    shardValue: 4,
    imageSrc: require('./assets/honey.png'),
  },
  [IngredientID.LargeLeek]: {
    name: 'Large Leek',
    description:
      "Whether this is the kind of vegetable stalk that Farfetch'd like is unknown.",
    basePower: 185,
    shardValue: 7,
    imageSrc: require('./assets/largeleek.png'),
  },
  [IngredientID.MoomooMilk]: {
    name: 'Moomoo Milk',
    description:
      'Highly nutritious milk. Pokémon that drink it become full of energy.',
    basePower: 98,
    shardValue: 4,
    imageSrc: require('./assets/moomoomilk.png'),
  },
  [IngredientID.PureOil]: {
    name: 'Pure Oil',
    description: 'All-purpose oil that can be used in any type of cuisine.',
    basePower: 121,
    shardValue: 5,
    imageSrc: require('./assets/pureoil.png'),
  },
  [IngredientID.SlowpokeTail]: {
    name: 'Slowpoke Tail',
    description:
      'A very tasty tail of something. When it falls off, it grows back quickly.',
    basePower: 342,
    shardValue: 14,
    imageSrc: require('./assets/slowpoketail.png'),
  },
  [IngredientID.SnoozyTomato]: {
    name: 'Snoozy Tomato',
    description: "A bright-red tomato. Eat it and you'll sleep like a baby.",
    basePower: 110,
    shardValue: 4,
    imageSrc: require('./assets/snoozytomato.png'),
  },
  [IngredientID.SoftPotato]: {
    name: 'Soft Potato',
    description:
      'Its mellow flavor makes both body and spirit feel warm and fuzzy.',
    basePower: 124,
    shardValue: 5,
    imageSrc: require('./assets/softpotato.png'),
  },
  [IngredientID.SoothingCacao]: {
    name: 'Soothing Cacao',
    description:
      'This cacao bean is time-consuming to process, but its soothing effects make the effort worthwhile.',
    basePower: 151,
    shardValue: 6,
    imageSrc: require('./assets/soothingcacao.png'),
  },
  [IngredientID.TastyMushroom]: {
    name: 'Tasty Mushroom',
    description: 'A juicy mushroom with an abundance of umami flavor.',
    basePower: 167,
    shardValue: 7,
    imageSrc: require('./assets/tastymushroom.png'),
  },
  [IngredientID.WarmingGinger]: {
    name: 'Warming Ginger',
    description:
      'Spicy ginger that warms the body better than any other ingredient.',
    basePower: 109,
    shardValue: 4,
    imageSrc: require('./assets/warmingginger.png'),
  },
};

/**
 * Helper to get ingredient data by ID.
 */
export function getIngredientData(id: IngredientID) {
  return Ingredients[id];
}
