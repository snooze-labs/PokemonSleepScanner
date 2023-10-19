import { IngredientID } from '../../ingredients/ingredients';
import { IRecipeData, RecipeType } from '../types';

/**
 * All known curry IDs.
 */
export enum CurryRecipeID {
  Beanburger = 'beanburgercurry',
  BulkUpBean = 'bulkupbeancurry',
  DreamEaterButter = 'dreameaterbuttercurry',
  DroughtKatsu = 'droughtkatsucurry',
  EggBomb = 'eggbombcurry',
  FancyApple = 'fancyapplecurry',
  GrilledTail = 'grilledtailcurry',
  HeartyCheeseburger = 'heartycheeseburgercurry',
  MeltyOmelette = 'meltyomelettecurry',
  MildHoney = 'mildhoneycurry',
  Mixed = 'mixedcurry',
  Ninja = 'ninjacurry',
  SimpleChowder = 'simplechowder',
  SoftPotatoChowder = 'softpotatochowder',
  SolarPowerTomato = 'solarpowertomatocurry',
  SpicyLeek = 'spicyleakcurry',
  SporeMushroom = 'sporemushroomcurry',
}

/**
 * Represents a curry recipe in Pokemon Sleep.
 */
export interface ICurryRecipeData extends IRecipeData {
  type: RecipeType.Curry;
}

/**
 * Map of all known curry recipes.
 */
export const CurryRecipes: { [key in CurryRecipeID]: ICurryRecipeData } = {
  [CurryRecipeID.Beanburger]: {
    name: 'Beanburger Curry',
    description:
      'The tender bean patties are the stars of the show in this curry.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.BeanSausage]: 7,
    },
    strengthLevels: [
      764, 779, 795, 810, 825, 833, 848, 863, 886, 902, 909, 924, 940, 947, 963,
      978, 993, 1001, 1016, 1031, 1047, 1070, 1085, 1108, 1123, 1146, 1161,
      1184, 1207, 1230, 1253, 1276, 1299, 1329, 1352, 1383, 1406, 1436, 1467,
      1497, 1528, 1559, 1589, 1627, 1658, 1696, 1734, 1772, 1811, 1849,
    ],
    imageSrc: require('./assets/beanburgercurry.png'),
  },
  [CurryRecipeID.BulkUpBean]: {
    name: 'Bulk Up Bean Curry',
    description: 'A hearty curry packed with nutrients needed for bulking up.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.BeanSausage]: 6,
      [IngredientID.FancyEgg]: 4,
      [IngredientID.FieryHerb]: 4,
      [IngredientID.GreengrassSoybeans]: 12,
    },
    strengthLevels: [
      3274, 3339, 3405, 3470, 3536, 3569, 3634, 3700, 3798, 3863, 3896, 3962,
      4027, 4060, 4125, 4191, 4256, 4289, 4354, 4420, 4485, 4584, 4649, 4747,
      4813, 4911, 4976, 5075, 5173, 5271, 5369, 5468, 5566, 5697, 5795, 5926,
      6024, 6155, 6286, 6417, 6548, 6679, 6810, 6974, 7105, 7268, 7432, 7596,
      7759, 7923,
    ],
    imageSrc: require('./assets/bulkupbeancurry.png'),
  },
  [CurryRecipeID.DreamEaterButter]: {
    name: 'Dream Eater Butter Curry',
    description:
      'The ingredients in this curry all share a connection to deep sleep.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.MoomooMilk]: 10,
      [IngredientID.SoftPotato]: 18,
      [IngredientID.SoothingCacao]: 12,
      [IngredientID.SnoozyTomato]: 15,
    },
    strengthLevels: [
      9010, 9190, 9370, 9551, 9731, 9821, 10001, 10181, 10452, 10632, 10722,
      10902, 11082, 11172, 11353, 11533, 11713, 11803, 11983, 12164, 12344,
      12614, 12794, 13065, 13245, 13515, 13695, 13966, 14236, 14506, 14776,
      15047, 15317, 15677, 15948, 16308, 16578, 16939, 17299, 17660, 18020,
      18380, 18741, 19191, 19552, 20002, 20453, 20903, 21354, 21804,
    ],
    imageSrc: require('./assets/dreameaterbuttercurry.png'),
  },
  [CurryRecipeID.DroughtKatsu]: {
    name: 'Drought Katsu Curry',
    description: 'The freshly-fried cutlet has a nice sparkle to it.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.BeanSausage]: 10,
      [IngredientID.PureOil]: 5,
    },
    strengthLevels: [
      1815, 1851, 1888, 1924, 1960, 1978, 2015, 2051, 2105, 2142, 2160, 2196,
      2232, 2251, 2287, 2323, 2360, 2378, 2414, 2450, 2487, 2541, 2577, 2632,
      2668, 2723, 2759, 2813, 2868, 2922, 2977, 3031, 3086, 3158, 3213, 3285,
      3340, 3412, 3485, 3557, 3630, 3703, 3775, 3866, 3939, 4029, 4120, 4211,
      4302, 4392,
    ],
    imageSrc: require('./assets/droughtkatsucurry.png'),
  },
  [CurryRecipeID.EggBomb]: {
    name: 'Egg Bomb Curry',
    description:
      '	A curry made with oodles of love. Its ingredients are geared toward kids.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.FancyApple]: 11,
      [IngredientID.FancyEgg]: 8,
      [IngredientID.Honey]: 12,
      [IngredientID.SoftPotato]: 4,
    },
    strengthLevels: [
      4523, 4613, 4704, 4794, 4885, 4930, 5021, 5111, 5247, 5337, 5382, 5473,
      5563, 5609, 5699, 5789, 5880, 5925, 6016, 6106, 6197, 6332, 6423, 6558,
      6649, 6785, 6875, 7011, 7146, 7282, 7418, 7553, 7689, 7870, 8006, 8187,
      8322, 8503, 8684, 8865, 9046, 9227, 9408, 9634, 9815, 10041, 10267, 10493,
      10720, 10946,
    ],
    imageSrc: require('./assets/eggbombcurry.png'),
  },
  [CurryRecipeID.FancyApple]: {
    name: 'Fancy Apple Curry',
    description:
      'A simple curry that lets the natural sweetness of its apples shine.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.FancyApple]: 7,
    },
    strengthLevels: [
      668, 681, 695, 708, 721, 728, 741, 755, 775, 788, 795, 808, 822, 828, 842,
      855, 868, 875, 888, 902, 915, 935, 949, 969, 982, 1002, 1015, 1035, 1055,
      1075, 1096, 1116, 1136, 1162, 1182, 1209, 1229, 1256, 1283, 1309, 1336,
      1363, 1389, 1423, 1450, 1483, 1516, 1550, 1583, 1617,
    ],
    imageSrc: require('./assets/fancyapplecurry.png'),
  },
  [CurryRecipeID.GrilledTail]: {
    name: 'Grilled Tail Curry',
    description:
      'The tasty tail elevates the flavor of the curry roux to the next level.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.FieryHerb]: 25,
      [IngredientID.SlowpokeTail]: 8,
    },
    strengthLevels: [
      7483, 7633, 7782, 7932, 8082, 8156, 8306, 8456, 8680, 8830, 8905, 9054,
      9204, 9279, 9429, 9578, 9728, 9803, 9952, 10102, 10252, 10476, 10626,
      10850, 11000, 11225, 11374, 11599, 11823, 12048, 12272, 12497, 12721,
      13020, 13245, 13544, 13769, 14068, 14367, 14667, 14966, 15265, 15565,
      15939, 16238, 16612, 16986, 17361, 17735, 18109,
    ],
    imageSrc: require('./assets/grilledtailcurry.png'),
  },
  [CurryRecipeID.HeartyCheeseburger]: {
    name: 'Hearty Cheeseburger Curry',
    description:
      'This voluminous curry is large enough to astound even a Snorlax.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.BeanSausage]: 8,
      [IngredientID.MoomooMilk]: 8,
    },
    strengthLevels: [
      1785, 1821, 1856, 1892, 1928, 1946, 1981, 2017, 2071, 2106, 2124, 2160,
      2196, 2213, 2249, 2285, 2321, 2338, 2374, 2410, 2445, 2499, 2535, 2588,
      2624, 2678, 2713, 2767, 2820, 2874, 2927, 2981, 3035, 3106, 3159, 3231,
      3284, 3356, 3427, 3499, 3570, 3641, 3713, 3802, 3873, 3963, 4052, 4141,
      4230, 4320,
    ],
    imageSrc: require('./assets/heartycheeseburgercurry.png'),
  },
  [CurryRecipeID.MeltyOmelette]: {
    name: 'Melty Omelette Curry',
    description:
      'This curry is topped with a masterfully-cooked omelette that simply melts in the mouth.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.FancyEgg]: 10,
      [IngredientID.SnoozyTomato]: 6,
    },
    strengthLevels: [
      2009, 2049, 2089, 2130, 2170, 2190, 2230, 2270, 2330, 2371, 2391, 2431,
      2471, 2491, 2531, 2572, 2612, 2632, 2672, 2712, 2752, 2813, 2853, 2913,
      2953, 3014, 3054, 3114, 3174, 3234, 3295, 3355, 3415, 3496, 3556, 3636,
      3697, 3777, 3857, 3938, 4018, 4098, 4179, 4279, 4360, 4460, 4560, 4661,
      4761, 4862,
    ],
    imageSrc: require('./assets/meltyomelettecurry.png'),
  },
  [CurryRecipeID.MildHoney]: {
    name: 'Mild Honey Curry',
    description:
      'A mild curry containing plenty of honey. Kids gobble it down!',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.Honey]: 7,
    },
    strengthLevels: [
      749, 764, 779, 794, 809, 816, 831, 846, 869, 884, 891, 906, 921, 929, 944,
      959, 974, 981, 996, 1011, 1026, 1049, 1064, 1086, 1101, 1124, 1138, 1161,
      1183, 1206, 1228, 1251, 1273, 1303, 1326, 1356, 1378, 1408, 1438, 1468,
      1498, 1528, 1558, 1595, 1625, 1663, 1700, 1738, 1775, 1813,
    ],
    imageSrc: require('./assets/mildhoneycurry.png'),
  },
  [CurryRecipeID.Mixed]: {
    name: 'Mixed Curry',
    description: '',
    type: RecipeType.Curry,
    ingredients: {},
    strengthLevels: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    imageSrc: require('./assets/mixedcurry.png'),
  },
  [CurryRecipeID.Ninja]: {
    name: 'Ninja Curry',
    description:
      'This tofu curry is said to have been a favorite dish of ninjas.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.BeanSausage]: 9,
      [IngredientID.GreengrassSoybeans]: 15,
      [IngredientID.LargeLeek]: 9,
      [IngredientID.TastyMushroom]: 5,
    },
    strengthLevels: [
      6159, 6282, 6405, 6529, 6652, 6713, 6836, 6960, 7144, 7268, 7329, 7452,
      7576, 7637, 7760, 7884, 8007, 8068, 8191, 8315, 8438, 8623, 8746, 8931,
      9054, 9239, 9362, 9546, 9731, 9916, 10101, 10286, 10470, 10717, 10901,
      11148, 11333, 11579, 11825, 12072, 12318, 12564, 12811, 13119, 13365,
      13673, 13981, 14289, 14597, 14905,
    ],
    imageSrc: require('./assets/ninjacurry.png'),
  },
  [CurryRecipeID.SimpleChowder]: {
    name: 'Simple Chowder',
    description:
      'You can really taste the richness of the milk in this simple chowder.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.MoomooMilk]: 7,
    },
    strengthLevels: [
      727, 742, 756, 771, 785, 792, 807, 822, 843, 858, 865, 880, 894, 901, 916,
      931, 945, 952, 967, 981, 996, 1018, 1032, 1054, 1069, 1091, 1105, 1127,
      1149, 1170, 1192, 1214, 1236, 1265, 1287, 1316, 1338, 1367, 1396, 1425,
      1454, 1483, 1512, 1549, 1578, 1614, 1650, 1687, 1723, 1759,
    ],
    imageSrc: require('./assets/simplechowder.png'),
  },
  [CurryRecipeID.SoftPotatoChowder]: {
    name: 'Soft Potato Chowder',
    description:
      'A thick chowder made from potatoes boiled until practically melting.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.MoomooMilk]: 10,
      [IngredientID.SoftPotato]: 8,
      [IngredientID.TastyMushroom]: 4,
    },
    strengthLevels: [
      3089, 3151, 3213, 3274, 3336, 3367, 3429, 3491, 3583, 3645, 3676, 3738,
      3799, 3830, 3892, 3954, 4016, 4047, 4108, 4170, 4232, 4325, 4386, 4479,
      4541, 4634, 4695, 4788, 4881, 4973, 5066, 5159, 5251, 5375, 5468, 5591,
      5684, 5807, 5931, 6054, 6178, 6302, 6425, 6580, 6703, 6858, 7012, 7166,
      7321, 7475,
    ],
    imageSrc: require('./assets/softpotatochowder.png'),
  },
  [CurryRecipeID.SolarPowerTomato]: {
    name: 'Solar Power Tomato Curry',
    description:
      'A curry made using tomatoes that have turned bright red in the sun.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.FieryHerb]: 5,
      [IngredientID.SnoozyTomato]: 10,
    },
    strengthLevels: [
      1943, 1982, 2021, 2060, 2098, 2118, 2157, 2196, 2254, 2293, 2312, 2351,
      2390, 2409, 2448, 2487, 2526, 2545, 2584, 2623, 2662, 2720, 2759, 2817,
      2856, 2915, 2953, 3012, 3070, 3128, 3187, 3245, 3303, 3381, 3439, 3517,
      3575, 3653, 3731, 3808, 3886, 3964, 4041, 4139, 4216, 4313, 4411, 4508,
      4605, 4702,
    ],
    imageSrc: require('./assets/solarpowertomatocurry.png'),
  },
  [CurryRecipeID.SpicyLeek]: {
    name: 'Spicy Leek Curry',
    description:
      'The roasted leeks are fragrant and sweet as fruit, perfectly balancing the spicy roux.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.FieryHerb]: 8,
      [IngredientID.LargeLeek]: 14,
      [IngredientID.WarmingGinger]: 10,
    },
    strengthLevels: [
      5900, 6018, 6136, 6254, 6372, 6431, 6549, 6667, 6844, 6962, 7021, 7139,
      7257, 7316, 7434, 7552, 7670, 7729, 7847, 7965, 8083, 8260, 8378, 8555,
      8673, 8850, 8968, 9145, 9322, 9499, 9676, 9853, 10030, 10266, 10443,
      10679, 10856, 11092, 11328, 11564, 11800, 12036, 12272, 12567, 12803,
      13098, 13393, 13688, 13983, 14278,
    ],
    imageSrc: require('./assets/spicyleekcurry.png'),
  },
  [CurryRecipeID.SporeMushroom]: {
    name: 'Spore Mushroom Curry',
    description:
      'A curry that puts you to sleep just as surely as the move Spore.',
    type: RecipeType.Curry,
    ingredients: {
      [IngredientID.SoftPotato]: 9,
      [IngredientID.TastyMushroom]: 14,
    },
    strengthLevels: [
      4041, 4122, 4203, 4283, 4364, 4405, 4486, 4566, 4688, 4768, 4809, 4890,
      4970, 5011, 5092, 5172, 5253, 5294, 5375, 5455, 5536, 5657, 5738, 5859,
      5940, 6062, 6142, 6264, 6385, 6506, 6627, 6748, 6870, 7031, 7153, 7314,
      7435, 7597, 7759, 7920, 8082, 8244, 8405, 8607, 8769, 8971, 9173, 9375,
      9577, 9779,
    ],
    imageSrc: require('./assets/sporemushroomcurry.png'),
  },
};
