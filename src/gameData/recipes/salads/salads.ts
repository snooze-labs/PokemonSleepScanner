import { IngredientID } from '../../ingredients/ingredients';
import { IRecipeData, RecipeType } from '../types';

/**
 * All known salad recipe IDs.
 */
export enum SaladRecipeID {
  BeanHamSalad = 'beanhamsalad',
  ContraryChocolateMeatSalad = 'contrarychocolatemeatsalad',
  DazzlingAppleCheeseSalad = 'dazzlingapplecheesesalad',
  FancyAppleSalad = 'fancyapplesalad',
  GluttonyPotatoSalad = 'gluttonypotatosalad',
  HeatWaveTofuSalad = 'heatwavetofusalad',
  ImmunityLeekSalad = 'immunityleeksalad',
  MixedSalad = 'mixedsalad',
  MoomooCapreseSalad = 'moomoocapresesalad',
  NinjaSalad = 'ninjasalad',
  OverheatGingerSalad = 'overheatgingersalad',
  SlowpokeTailPepperSalad = 'slowpoketailpeppersalad',
  SnoozyTomatoSalad = 'snoozytomatosalad',
  SnowCloakCaesarSalad = 'snowcloakcaesarsalad',
  SporeMushroomSalad = 'sporemushroomsalad',
  SuperpowerExtremeSalad = 'superpowerextremesalad',
  WaterVeilTofuSalad = 'waterveiltofusalad',
}

/**
 * Represents a salad recipe in Pokemon Sleep.
 */
export interface ISaladRecipeData extends IRecipeData {
  type: RecipeType.Salad;
}

/**
 * Map of all known salad recipes.
 */
export const SaladRecipes: { [key in SaladRecipeID]: ISaladRecipeData } = {
  [SaladRecipeID.BeanHamSalad]: {
    name: 'Bean Ham Salad',
    description: 'This simple salad features ham made from Bean Sausages.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.BeanSausage]: 8,
    },
    strengthLevels: [
      873, 890, 908, 925, 943, 952, 969, 986, 1013, 1030, 1039, 1056, 1074,
      1083, 1100, 1117, 1135, 1144, 1161, 1179, 1196, 1222, 1240, 1266, 1283,
      1310, 1327, 1353, 1379, 1406, 1432, 1458, 1484, 1519, 1545, 1580, 1606,
      1641, 1676, 1711, 1746, 1781, 1816, 1859, 1894, 1938, 1982, 2025, 2069,
      2113,
    ],
    imageSrc: require('./assets/beanhamsalad.png'),
  },
  [SaladRecipeID.ContraryChocolateMeatSalad]: {
    name: 'Contrary Chocolate Meat Salad',
    description:
      'The savory sauce and sweet chocolate sauce let you enjoy a mix of flavors.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.BeanSausage]: 9,
      [IngredientID.SoothingCacao]: 14,
    },
    strengthLevels: [
      3558, 3629, 3700, 3771, 3843, 3878, 3949, 4021, 4127, 4198, 4234, 4305,
      4376, 4412, 4483, 4554, 4625, 4661, 4732, 4803, 4874, 4981, 5052, 5159,
      5230, 5337, 5408, 5515, 5622, 5728, 5835, 5942, 6049, 6191, 6298, 6440,
      6547, 6689, 6831, 6974, 7116, 7258, 7401, 7579, 7721, 7899, 8077, 8255,
      8432, 8610,
    ],
    imageSrc: require('./assets/contrarychocolatemeatsalad.png'),
  },
  [SaladRecipeID.DazzlingAppleCheeseSalad]: {
    name: 'Dazzling Apple Cheese Salad',
    description:
      'The simple seasoning keeps the focus on the sublime pairing of ingredients.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.FancyApple]: 15,
      [IngredientID.MoomooMilk]: 5,
      [IngredientID.PureOil]: 3,
    },
    strengthLevels: [
      2578, 2630, 2681, 2733, 2784, 2810, 2862, 2913, 2990, 3042, 3068, 3119,
      3171, 3197, 3248, 3300, 3351, 3377, 3429, 3480, 3532, 3609, 3661, 3738,
      3790, 3867, 3919, 3996, 4073, 4151, 4228, 4305, 4383, 4486, 4563, 4666,
      4744, 4847, 4950, 5053, 5156, 5259, 5362, 5491, 5594, 5723, 5852, 5981,
      6110, 6239,
    ],
    imageSrc: require('./assets/dazzlingapplecheesesalad.png'),
  },
  [SaladRecipeID.FancyAppleSalad]: {
    name: 'Fancy Apple Salad',
    description: 'A simple salad accentuated by a mashed apple dressing.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.FancyApple]: 8,
    },
    strengthLevels: [
      763, 778, 794, 809, 824, 832, 847, 862, 885, 900, 908, 923, 938, 946, 961,
      977, 992, 1000, 1015, 1030, 1045, 1068, 1083, 1106, 1122, 1145, 1160,
      1183, 1206, 1228, 1251, 1274, 1297, 1328, 1351, 1381, 1404, 1434, 1465,
      1495, 1526, 1557, 1587, 1625, 1656, 1694, 1732, 1770, 1808, 1846,
    ],
    imageSrc: require('./assets/fancyapplesalad.png'),
  },
  [SaladRecipeID.GluttonyPotatoSalad]: {
    name: 'Gluttony Potato Salad',
    description:
      'This potato salad contains just a hint of flavor from the Fancy Apples.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.BeanSausage]: 7,
      [IngredientID.FancyApple]: 6,
      [IngredientID.FancyEgg]: 9,
      [IngredientID.SoftPotato]: 14,
    },
    strengthLevels: [
      5040, 5141, 5242, 5342, 5443, 5494, 5594, 5695, 5846, 5947, 5998, 6098,
      6199, 6250, 6350, 6451, 6552, 6602, 6703, 6804, 6905, 7056, 7157, 7308,
      7409, 7560, 7661, 7812, 7963, 8114, 8266, 8417, 8568, 8770, 8921, 9122,
      9274, 9475, 9677, 9878, 10080, 10282, 10483, 10735, 10937, 11189, 11441,
      11693, 11945, 12197,
    ],
    imageSrc: require('./assets/gluttonypotatosalad.png'),
  },
  [SaladRecipeID.HeatWaveTofuSalad]: {
    name: 'Heat Wave Tofu Salad',
    description: 'A tofu salad covered in bright red spicy sauce.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.FieryHerb]: 6,
      [IngredientID.GreengrassSoybeans]: 10,
    },
    strengthLevels: [
      1976, 2016, 2055, 2095, 2134, 2154, 2193, 2233, 2292, 2332, 2351, 2391,
      2430, 2450, 2490, 2529, 2569, 2589, 2628, 2668, 2707, 2766, 2806, 2865,
      2905, 2964, 3004, 3063, 3122, 3181, 3241, 3300, 3359, 3438, 3498, 3577,
      3636, 3715, 3794, 3873, 3952, 4031, 4110, 4209, 4288, 4387, 4486, 4584,
      4683, 4782,
    ],
    imageSrc: require('./assets/heatwavetofusalad.png'),
  },
  [SaladRecipeID.ImmunityLeekSalad]: {
    name: 'Immunity Leek Salad',
    description:
      'The crisp leeks in this salad do wonders for the immune system.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.LargeLeek]: 10,
      [IngredientID.WarmingGinger]: 5,
    },
    strengthLevels: [
      2658, 2711, 2764, 2817, 2871, 2897, 2950, 3004, 3083, 3136, 3163, 3216,
      3269, 3296, 3349, 3402, 3455, 3482, 3535, 3588, 3641, 3721, 3774, 3854,
      3907, 3987, 4040, 4120, 4200, 4279, 4359, 4439, 4519, 4625, 4705, 4811,
      4891, 4997, 5103, 5210, 5316, 5422, 5529, 5662, 5768, 5901, 6034, 6167,
      6299, 6432,
    ],
    imageSrc: require('./assets/immunityleeksalad.png'),
  },
  [SaladRecipeID.MixedSalad]: {
    name: 'Mixed Salad',
    description: '',
    type: RecipeType.Salad,
    ingredients: {},
    strengthLevels: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    imageSrc: require('./assets/mixedsalad.png'),
  },
  [SaladRecipeID.MoomooCapreseSalad]: {
    name: 'Moomoo Caprese Salad',
    description:
      'A basic salad containing only cheese, tomatoes, and a splash of oil.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.MoomooMilk]: 12,
      [IngredientID.PureOil]: 5,
      [IngredientID.SnoozyTomato]: 6,
    },
    strengthLevels: [
      2856, 2913, 2970, 3027, 3084, 3113, 3170, 3227, 3313, 3370, 3399, 3456,
      3513, 3541, 3599, 3656, 3713, 3741, 3798, 3856, 3913, 3998, 4056, 4141,
      4198, 4284, 4341, 4427, 4512, 4598, 4684, 4770, 4855, 4969, 5055, 5169,
      5255, 5369, 5484, 5598, 5712, 5826, 5940, 6083, 6198, 6340, 6483, 6626,
      6769, 6912,
    ],
    imageSrc: require('./assets/moomoocapresesalad.png'),
  },
  [SaladRecipeID.NinjaSalad]: {
    name: 'Ninja Salad',
    description:
      "Ninjas cannot resist the flavor of this tofu salad. It's eaten in a flash!",
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.GreengrassSoybeans]: 15,
      [IngredientID.LargeLeek]: 15,
      [IngredientID.TastyMushroom]: 12,
      [IngredientID.WarmingGinger]: 11,
    },
    strengthLevels: [
      10095, 10297, 10499, 10701, 10903, 11004, 11205, 11407, 11710, 11912,
      12013, 12215, 12417, 12518, 12720, 12922, 13124, 13224, 13426, 13628,
      13830, 14133, 14335, 14638, 14840, 15143, 15344, 15647, 15950, 16253,
      16556, 16859, 17162, 17565, 17868, 18272, 18575, 18979, 19382, 19786,
      20190, 20594, 20998, 21502, 21906, 22411, 22916, 23420, 23925, 24430,
    ],
    imageSrc: require('./assets/ninjasalad.png'),
  },
  [SaladRecipeID.OverheatGingerSalad]: {
    name: 'Overheat Ginger Salad',
    description:
      "This salad's special ginger dressing warms you through and through.",
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.FieryHerb]: 17,
      [IngredientID.SnoozyTomato]: 8,
      [IngredientID.WarmingGinger]: 10,
    },
    strengthLevels: [
      5225, 5330, 5434, 5539, 5643, 5695, 5800, 5904, 6061, 6166, 6218, 6322,
      6427, 6479, 6584, 6688, 6793, 6845, 6949, 7054, 7158, 7315, 7420, 7576,
      7681, 7838, 7942, 8099, 8256, 8412, 8569, 8726, 8883, 9092, 9248, 9457,
      9614, 9823, 10032, 10241, 10450, 10659, 10868, 11129, 11338, 11600, 11861,
      12122, 12383, 12645,
    ],
    imageSrc: require('./assets/overheatgingersalad.png'),
  },
  [SaladRecipeID.SlowpokeTailPepperSalad]: {
    name: 'Slowpoke Tail Pepper Salad',
    description:
      'The mouth-tinglingly spicy pepper highlights the sweetness of the tail.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.FieryHerb]: 10,
      [IngredientID.PureOil]: 15,
      [IngredientID.SlowpokeTail]: 10,
    },
    strengthLevels: [
      8169, 8332, 8496, 8659, 8823, 8904, 9068, 9231, 9476, 9639, 9721, 9884,
      10048, 10130, 10293, 10456, 10620, 10701, 10865, 11028, 11192, 11437,
      11600, 11845, 12008, 12254, 12417, 12662, 12907, 13152, 13397, 13642,
      13887, 14214, 14459, 14786, 15031, 15358, 15684, 16011, 16338, 16665,
      16992, 17400, 17727, 18135, 18544, 18952, 19361, 19769,
    ],
    imageSrc: require('./assets/slowpoketailpeppersalad.png'),
  },
  [SaladRecipeID.SnoozyTomatoSalad]: {
    name: 'Snoozy Tomato Salad',
    description:
      'The Snoozy Tomatoes in this simple salad are a great aid for sleep.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.SnoozyTomato]: 8,
    },
    strengthLevels: [
      933, 952, 970, 989, 1008, 1017, 1036, 1054, 1082, 1101, 1110, 1129, 1148,
      1157, 1176, 1194, 1213, 1222, 1241, 1260, 1278, 1306, 1325, 1353, 1372,
      1400, 1418, 1446, 1474, 1502, 1530, 1558, 1586, 1623, 1651, 1689, 1717,
      1754, 1791, 1829, 1866, 1903, 1941, 1987, 2025, 2071, 2118, 2165, 2211,
      2258,
    ],
    imageSrc: require('./assets/snoozytomatosalad.png'),
  },
  [SaladRecipeID.SnowCloakCaesarSalad]: {
    name: 'Snow Cloak Caesar Salad',
    description:
      'A bacon salad topped with a generous snowy sprinkling of cheese.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.BeanSausage]: 6,
      [IngredientID.MoomooMilk]: 10,
    },
    strengthLevels: [
      1774, 1809, 1845, 1880, 1916, 1934, 1969, 2005, 2058, 2093, 2111, 2147,
      2182, 2200, 2235, 2271, 2306, 2324, 2359, 2395, 2430, 2484, 2519, 2572,
      2608, 2661, 2696, 2750, 2803, 2856, 2909, 2963, 3016, 3087, 3140, 3211,
      3264, 3335, 3406, 3477, 3548, 3619, 3690, 3779, 3850, 3938, 4027, 4116,
      4204, 4293,
    ],
    imageSrc: require('./assets/snowcloakcaesarsalad.png'),
  },
  [SaladRecipeID.SporeMushroomSalad]: {
    name: 'Spore Mushroom Salad',
    description: 'A salad rich in minerals that improve the quality of sleep.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.PureOil]: 8,
      [IngredientID.SnoozyTomato]: 8,
      [IngredientID.TastyMushroom]: 17,
    },
    strengthLevels: [
      5859, 5976, 6093, 6211, 6328, 6386, 6503, 6621, 6796, 6914, 6972, 7089,
      7207, 7265, 7382, 7500, 7617, 7675, 7792, 7910, 8027, 8203, 8320, 8496,
      8613, 8789, 8906, 9081, 9257, 9433, 9609, 9785, 9960, 10195, 10370, 10605,
      10781, 11015, 11249, 11484, 11718, 11952, 12187, 12480, 12714, 13007,
      13300, 13593, 13886, 14179,
    ],
    imageSrc: require('./assets/sporemushroomsalad.png'),
  },
  [SaladRecipeID.SuperpowerExtremeSalad]: {
    name: 'Superpower Extreme Salad',
    description:
      'A hefty salad that provides all your daily nutrients at once.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.BeanSausage]: 9,
      [IngredientID.FancyApple]: 5,
      [IngredientID.SoftPotato]: 3,
      [IngredientID.WarmingGinger]: 6,
    },
    strengthLevels: [
      2958, 3017, 3076, 3135, 3195, 3224, 3283, 3343, 3431, 3490, 3520, 3579,
      3638, 3668, 3727, 3786, 3845, 3875, 3934, 3993, 4052, 4141, 4200, 4289,
      4348, 4437, 4496, 4585, 4674, 4762, 4851, 4940, 5029, 5147, 5236, 5354,
      5443, 5561, 5679, 5798, 5916, 6034, 6153, 6301, 6419, 6567, 6715, 6863,
      7010, 7158,
    ],
    imageSrc: require('./assets/superpowerextremesalad.png'),
  },
  [SaladRecipeID.WaterVeilTofuSalad]: {
    name: 'Water Veil Tofu Salad',
    description: 'A salad topped with wobbly cubes of tofu.',
    type: RecipeType.Salad,
    ingredients: {
      [IngredientID.GreengrassSoybeans]: 10,
      [IngredientID.SnoozyTomato]: 6,
    },
    strengthLevels: [
      1843, 1880, 1917, 1954, 1990, 2009, 2046, 2083, 2138, 2175, 2193, 2230,
      2267, 2285, 2322, 2359, 2396, 2414, 2451, 2488, 2525, 2580, 2617, 2672,
      2709, 2765, 2801, 2857, 2912, 2967, 3023, 3078, 3133, 3207, 3262, 3336,
      3391, 3465, 3539, 3612, 3686, 3760, 3833, 3926, 3999, 4091, 4184, 4276,
      4368, 4460,
    ],
    imageSrc: require('./assets/waterveiltofusalad.png'),
  },
};
