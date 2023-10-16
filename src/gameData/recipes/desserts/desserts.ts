import { IngredientID } from '../../ingredients/ingredients';
import { IRecipeData, RecipeType } from '../recipes';

/**
 * All known dessert recipe IDs.
 */
export enum DessertRecipeID {
  BigMalasada = 'bigmalasada',
  CloudNineSoyCake = 'cloudninesoycake',
  CraftSodaPop = 'craftsodapop',
  EmberGingerTea = 'embergingertea',
  FancyAppleJuice = 'fancyapplejuice',
  FluffySweetPotatoes = 'fluffysweetpotatoes',
  HugePowerSoyDonuts = 'hugepowersoydonuts',
  HustleProteinSmoothie = 'hustleproteinsmoothie',
  JigglyPuffsFruityFlan = "jigglypuff'sfruityflan",
  LovelyKissSmoothie = 'lovelykisssmoothie',
  LuckyChantApplePie = 'luckychantapplepie',
  MixedJuice = 'mixedjuice',
  NerolisRestorativeTea = "neroli'srestorativetea",
  StalwartVegetableJuice = 'stalwartvegetablejuice',
  SteadfastGingerCookies = 'steadfastgingercookies',
  SweetScentChocolateCake = 'sweetscentchocolatecake',
  WarmMoomooMilk = 'warmmoomoomilk',
}

/**
 * Represents a dessert recipe in Pokemon Sleep.
 */
export interface IDessertRecipeData extends IRecipeData {
  type: RecipeType.Dessert;
}

/**
 * Map of all known dessert recipes.
 */
export const DessertRecipes: { [key in DessertRecipeID]: IDessertRecipeData } =
  {
    [DessertRecipeID.BigMalasada]: {
      name: 'Big Malasada',
      description:
        'A special fried bread made using a recipe from the Alola region.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.Honey]: 6,
        [IngredientID.MoomooMilk]: 7,
        [IngredientID.PureOil]: 10,
      },
      strengthLevels: [
        2927, 2986, 3044, 3103, 3161, 3190, 3249, 3308, 3395, 3454, 3483, 3542,
        3600, 3629, 3688, 3747, 3805, 3834, 3893, 3951, 4010, 4098, 4156, 4244,
        4303, 4391, 4449, 4537, 4625, 4712, 4800, 4888, 4976, 5093, 5181, 5298,
        5386, 5503, 5620, 5737, 5854, 5971, 6088, 6235, 6352, 6498, 6644, 6791,
        6937, 7083,
      ],
    },
    [DessertRecipeID.CloudNineSoyCake]: {
      name: 'Cloud Nine Soy Cake',
      description: 'A soy cake with a nice, light texture.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.FancyEgg]: 8,
        [IngredientID.GreengrassSoybeans]: 7,
      },
      strengthLevels: [
        1798, 1834, 1870, 1906, 1942, 1960, 1996, 2032, 2086, 2122, 2140, 2176,
        2212, 2230, 2265, 2301, 2337, 2355, 2391, 2427, 2463, 2517, 2553, 2607,
        2643, 2697, 2733, 2787, 2841, 2895, 2949, 3003, 3057, 3129, 3182, 3254,
        3308, 3380, 3452, 3524, 3596, 3668, 3740, 3830, 3902, 3992, 4081, 4171,
        4261, 4351,
      ],
    },
    [DessertRecipeID.CraftSodaPop]: {
      name: 'Craft Soda Pop',
      description: 'A highly carbonated artisan soda.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.Honey]: 9,
      },
      strengthLevels: [
        964, 983, 1003, 1022, 1041, 1051, 1070, 1089, 1118, 1138, 1147, 1166,
        1186, 1195, 1215, 1234, 1253, 1263, 1282, 1301, 1321, 1350, 1369, 1398,
        1417, 1446, 1465, 1494, 1523, 1552, 1581, 1610, 1639, 1677, 1706, 1745,
        1774, 1812, 1851, 1889, 1928, 1967, 2005, 2053, 2092, 2140, 2188, 2236,
        2285, 2333,
      ],
    },
    [DessertRecipeID.EmberGingerTea]: {
      name: 'Ember Ginger Tea',
      description:
        'Apples have been added to the spicy ginger, helping the tea go down easily.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.FancyApple]: 7,
        [IngredientID.WarmingGinger]: 9,
      },
      strengthLevels: [
        1788, 1824, 1860, 1895, 1931, 1949, 1985, 2020, 2074, 2110, 2128, 2163,
        2199, 2217, 2253, 2289, 2324, 2342, 2378, 2414, 2450, 2503, 2539, 2593,
        2628, 2682, 2718, 2771, 2825, 2879, 2932, 2986, 3040, 3111, 3165, 3236,
        3290, 3361, 3433, 3504, 3576, 3648, 3719, 3808, 3880, 3969, 4059, 4148,
        4238, 4327,
      ],
    },
    [DessertRecipeID.FancyAppleJuice]: {
      name: 'Fancy Apple Juice',
      description: 'A rich juice containing only the very best apples.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.FancyApple]: 8,
      },
      strengthLevels: [
        763, 778, 794, 809, 824, 832, 847, 862, 885, 900, 908, 923, 938, 946,
        961, 977, 992, 1000, 1015, 1030, 1045, 1068, 1083, 1106, 1122, 1145,
        1160, 1183, 1206, 1228, 1251, 1274, 1297, 1328, 1351, 1381, 1404, 1434,
        1465, 1495, 1526, 1557, 1587, 1625, 1656, 1694, 1732, 1770, 1808, 1846,
      ],
    },
    [DessertRecipeID.FluffySweetPotatoes]: {
      name: 'Fluffy Sweet Potatoes',
      description:
        "These perfectly ripe potatoes don't rely on honey to deliver a sweet kick.",
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.MoomooMilk]: 5,
        [IngredientID.SoftPotato]: 9,
      },
      strengthLevels: [
        1783, 1819, 1854, 1890, 1926, 1943, 1979, 2015, 2068, 2104, 2122, 2157,
        2193, 2211, 2247, 2282, 2318, 2336, 2371, 2407, 2443, 2496, 2532, 2585,
        2621, 2675, 2710, 2764, 2817, 2871, 2924, 2978, 3031, 3102, 3156, 3227,
        3281, 3352, 3423, 3495, 3566, 3637, 3709, 3798, 3869, 3958, 4047, 4137,
        4226, 4315,
      ],
    },
    [DessertRecipeID.HugePowerSoyDonuts]: {
      name: 'Huge Power Soy Donuts',
      description:
        "Soy donuts fried to crisp perfection. They're bodybuilders' friends.",
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.GreengrassSoybeans]: 6,
        [IngredientID.PureOil]: 9,
        [IngredientID.SoothingCacao]: 7,
      },
      strengthLevels: [
        3213, 3277, 3342, 3406, 3470, 3502, 3566, 3631, 3727, 3791, 3823, 3888,
        3952, 3984, 4048, 4113, 4177, 4209, 4273, 4338, 4402, 4498, 4562, 4659,
        4723, 4820, 4884, 4980, 5077, 5173, 5269, 5366, 5462, 5591, 5687, 5816,
        5912, 6040, 6169, 6297, 6426, 6555, 6683, 6844, 6972, 7133, 7294, 7454,
        7615, 7775,
      ],
    },
    [DessertRecipeID.HustleProteinSmoothie]: {
      name: 'Hustle Protein Smoothie',
      description:
        'A glass of this sweet smoothie goes down a treat after a training session.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.GreengrassSoybeans]: 15,
        [IngredientID.SoothingCacao]: 8,
      },
      strengthLevels: [
        3168, 3231, 3295, 3358, 3421, 3453, 3516, 3580, 3675, 3738, 3770, 3833,
        3897, 3928, 3992, 4055, 4118, 4150, 4213, 4277, 4340, 4435, 4499, 4594,
        4657, 4752, 4815, 4910, 5005, 5100, 5196, 5291, 5386, 5512, 5607, 5734,
        5829, 5956, 6083, 6209, 6336, 6463, 6589, 6748, 6875, 7033, 7191, 7350,
        7508, 7667,
      ],
    },
    [DessertRecipeID.JigglyPuffsFruityFlan]: {
      name: "Jigglypuff's Fruity Flan",
      description: "A very special flan that's as springy as a balloon.",
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.FancyApple]: 10,
        [IngredientID.FancyEgg]: 15,
        [IngredientID.Honey]: 20,
        [IngredientID.MoomooMilk]: 10,
      },
      strengthLevels: [
        7594, 7746, 7898, 8050, 8202, 8277, 8429, 8581, 8809, 8961, 9037, 9189,
        9341, 9417, 9568, 9720, 9872, 9948, 10100, 10252, 10404, 10632, 10783,
        11011, 11163, 11391, 11543, 11771, 11999, 12226, 12454, 12682, 12910,
        13214, 13441, 13745, 13973, 14277, 14580, 14884, 15188, 15492, 15796,
        16175, 16479, 16859, 17238, 17618, 17998, 18377,
      ],
    },
    [DessertRecipeID.LovelyKissSmoothie]: {
      name: 'Lovely Kiss Smoothie',
      description:
        'A relaxing drink that soothes your weariness and envelops you in sleep.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.FancyApple]: 11,
        [IngredientID.Honey]: 7,
        [IngredientID.MoomooMilk]: 9,
        [IngredientID.SoothingCacao]: 8,
      },
      strengthLevels: [
        4734, 4829, 4923, 5018, 5113, 5160, 5255, 5349, 5491, 5586, 5633, 5728,
        5823, 5870, 5965, 6060, 6154, 6202, 6296, 6391, 6486, 6628, 6722, 6864,
        6959, 7101, 7196, 7338, 7480, 7622, 7764, 7906, 8048, 8237, 8379, 8569,
        8711, 8900, 9089, 9279, 9468, 9657, 9847, 10083, 10273, 10509, 10746,
        10983, 11220, 11456,
      ],
    },
    [DessertRecipeID.LuckyChantApplePie]: {
      name: 'Lucky Chant Apple Pie',
      description: 'The chunky pieces of apple in this pie are lucky finds!',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.FancyApple]: 12,
        [IngredientID.MoomooMilk]: 4,
      },
      strengthLevels: [
        1634, 1667, 1699, 1732, 1765, 1781, 1814, 1846, 1895, 1928, 1944, 1977,
        2010, 2026, 2059, 2092, 2124, 2141, 2173, 2206, 2239, 2288, 2320, 2369,
        2402, 2451, 2484, 2533, 2582, 2631, 2680, 2729, 2778, 2843, 2892, 2958,
        3007, 3072, 3137, 3203, 3268, 3333, 3399, 3480, 3546, 3627, 3709, 3791,
        3873, 3954,
      ],
    },
    [DessertRecipeID.MixedJuice]: {
      name: 'Mixed Juice',
      description: '',
      type: RecipeType.Dessert,
      ingredients: {},
      strengthLevels: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ],
    },
    [DessertRecipeID.NerolisRestorativeTea]: {
      name: "Neroli's Restorative Tea",
      description: 'A special restorative tea made by Professor Neroli.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.FancyApple]: 15,
        [IngredientID.TastyMushroom]: 9,
        [IngredientID.WarmingGinger]: 11,
      },
      strengthLevels: [
        5065, 5166, 5268, 5369, 5470, 5521, 5622, 5723, 5875, 5977, 6027, 6129,
        6230, 6281, 6382, 6483, 6585, 6635, 6736, 6838, 6939, 7091, 7192, 7344,
        7446, 7598, 7699, 7851, 8003, 8155, 8307, 8459, 8611, 8813, 8965, 9168,
        9320, 9522, 9725, 9927, 10130, 10333, 10535, 10788, 10991, 11244, 11498,
        11751, 12004, 12257,
      ],
    },
    [DessertRecipeID.StalwartVegetableJuice]: {
      name: 'Stalwart Vegetable Juice',
      description: 'An easy-to-make juice with natural sweet and sour flavors.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.FancyApple]: 7,
        [IngredientID.SnoozyTomato]: 9,
      },
      strengthLevels: [
        1798, 1834, 1870, 1906, 1942, 1960, 1996, 2032, 2086, 2122, 2140, 2176,
        2212, 2230, 2265, 2301, 2337, 2355, 2391, 2427, 2463, 2517, 2553, 2607,
        2643, 2697, 2733, 2787, 2841, 2895, 2949, 3003, 3057, 3129, 3182, 3254,
        3308, 3380, 3452, 3524, 3596, 3668, 3740, 3830, 3902, 3992, 4081, 4171,
        4261, 4351,
      ],
    },
    [DessertRecipeID.SteadfastGingerCookies]: {
      name: 'Steadfast Ginger Cookies',
      description:
        'These cookies give you the power to tackle hardships without crumbling.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.FancyApple]: 4,
        [IngredientID.Honey]: 14,
        [IngredientID.SoothingCacao]: 5,
        [IngredientID.WarmingGinger]: 12,
      },
      strengthLevels: [
        4921, 5019, 5118, 5216, 5315, 5364, 5462, 5561, 5708, 5807, 5856, 5954,
        6053, 6102, 6200, 6299, 6397, 6447, 6545, 6643, 6742, 6889, 6988, 7135,
        7234, 7382, 7480, 7628, 7775, 7923, 8070, 8218, 8366, 8563, 8710, 8907,
        9055, 9251, 9448, 9645, 9842, 10039, 10236, 10482, 10679, 10925, 11171,
        11417, 11663, 11909,
      ],
    },
    [DessertRecipeID.SweetScentChocolateCake]: {
      name: 'Sweet Scent Chocolate Cake',
      description:
        "Neither people nor Pokémon can resist the lure of this cake's sweet aroma.",
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.Honey]: 9,
        [IngredientID.MoomooMilk]: 7,
        [IngredientID.SoothingCacao]: 8,
      },
      strengthLevels: [
        3280, 3346, 3411, 3477, 3542, 3575, 3641, 3706, 3805, 3870, 3903, 3969,
        4034, 4067, 4133, 4198, 4264, 4297, 4362, 4428, 4494, 4592, 4658, 4756,
        4822, 4920, 4986, 5084, 5182, 5281, 5379, 5478, 5576, 5707, 5806, 5937,
        6035, 6166, 6298, 6429, 6560, 6691, 6822, 6986, 7118, 7282, 7446, 7610,
        7774, 7938,
      ],
    },
    [DessertRecipeID.WarmMoomooMilk]: {
      name: 'Warm Moomoo Milk',
      description:
        'Moomoo Milk that has been heated to further draw out its sweetness.',
      type: RecipeType.Dessert,
      ingredients: {
        [IngredientID.MoomooMilk]: 7,
      },
      strengthLevels: [
        727, 742, 756, 771, 785, 792, 807, 822, 843, 858, 865, 880, 894, 901,
        916, 931, 945, 952, 967, 981, 996, 1018, 1032, 1054, 1069, 1091, 1105,
        1127, 1149, 1170, 1192, 1214, 1236, 1265, 1287, 1316, 1338, 1367, 1396,
        1425, 1454, 1483, 1512, 1549, 1578, 1614, 1650, 1687, 1723, 1759,
      ],
    },
  };
