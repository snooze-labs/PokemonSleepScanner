import { ImageURISource } from 'react-native';
import { FixedArray, PokemonType } from '../commonTypes';

/**
 * All known berry IDs.
 */
export enum BerryID {
  Belue = 'belueberry',
  Bluk = 'blukberry',
  Cheri = 'cheriberry',
  Chesto = 'chestoberry',
  Durin = 'durinberry',
  Figy = 'figyberry',
  Grepa = 'grepaberry',
  Leppa = 'leppaberry',
  Lum = 'lumberry',
  Mago = 'magoberry',
  Oran = 'oranberry',
  Pamtre = 'pamtreberry',
  Pecha = 'pechaberry',
  Persim = 'persimberry',
  Rawst = 'rawstberry',
  Sitrus = 'sitrusberry',
  Wiki = 'wikiberry',
  Yache = 'yacheberry',
}

/**
 * Represents a berry in Pokemon Sleep.
 */
export interface IBerryData {
  name: string;
  description: string;
  pokemonType: PokemonType;
  strengthChart: FixedArray<number, 60>;
  imageSrc: ImageURISource;
}

/**
 * Map of all known berries.
 */
export const Berries: { [key in BerryID]: IBerryData } = {
  [BerryID.Belue]: {
    name: 'Belue Berry',
    description:
      "This glossy and colorful Berry has a mouthwateringly delicious appearance. However, it's awfully sour.",
    pokemonType: PokemonType.Steel,
    strengthChart: [
      33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      51, 53, 54, 55, 57, 58, 60, 61, 63, 64, 66, 68, 69, 71, 73, 75, 76, 78,
      80, 82, 84, 86, 89, 91, 93, 95, 98, 100, 103, 105, 108, 111, 113, 116,
      119, 122, 125, 128, 132, 135, 138, 142,
    ],
    imageSrc: require('./assets/belueberry.png'),
  },
  [BerryID.Bluk]: {
    name: 'Bluk Berry',
    description:
      'Though this small, delicately skinned Berry is blue in color, it dyes the mouth black when eaten.',
    pokemonType: PokemonType.Ghost,
    strengthChart: [
      26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
      44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 62,
      63, 65, 66, 68, 70, 72, 73, 75, 77, 79, 81, 83, 85, 87, 89, 92, 94, 96,
      99, 101, 104, 106, 109, 112,
    ],
    imageSrc: require('./assets/blukberry.png'),
  },
  [BerryID.Cheri]: {
    name: 'Cheri Berry',
    description:
      'This bright red Berry is very spicy and has a provocative flavor. It blooms with delicate, pretty flowers.',
    pokemonType: PokemonType.Fighting,
    strengthChart: [
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
      45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 61, 63, 64,
      66, 67, 69, 71, 72, 74, 76, 78, 80, 82, 84, 86, 88, 91, 93, 95, 98, 100,
      102, 105, 108, 110, 113, 116,
    ],
    imageSrc: require('./assets/cheriberry.png'),
  },
  [BerryID.Chesto]: {
    name: 'Chesto Berry',
    description:
      "This Berry's thick skin and fruit are very tough and dry-tasting. However, every bit of it can be eaten.",
    pokemonType: PokemonType.Poison,
    strengthChart: [
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 54, 55, 56, 58, 59, 61, 62, 64, 65, 67, 69, 71, 72, 74, 76,
      78, 80, 82, 84, 86, 88, 90, 93, 95, 97, 100, 102, 105, 107, 110, 113, 116,
      118, 121, 124, 128, 131, 134, 137,
    ],
    imageSrc: require('./assets/chestoberry.png'),
  },
  [BerryID.Durin]: {
    name: 'Durin Berry',
    description:
      'This Berry is tremendously bitter. Just one bite is enough to instantly stop hiccups.',
    pokemonType: PokemonType.Grass,
    strengthChart: [
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
      48, 49, 50, 51, 52, 53, 54, 56, 57, 58, 60, 61, 63, 65, 66, 68, 69, 71,
      73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 96, 98, 101, 103, 106, 108,
      111, 114, 117, 120, 123, 126, 129,
    ],
    imageSrc: require('./assets/durinberry.png'),
  },
  [BerryID.Figy]: {
    name: 'Figy Berry',
    description:
      "This Berry is oddly shaped, appearing as if someone took a bite out of it. It's packed full of spicy substances.",
    pokemonType: PokemonType.Ground,
    strengthChart: [
      29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
      47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 59, 61, 62, 64, 66, 67, 69,
      71, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 93, 95, 97, 100, 102, 105,
      107, 110, 113, 116, 118, 121, 124,
    ],
    imageSrc: require('./assets/figyberry.png'),
  },
  [BerryID.Grepa]: {
    name: 'Grepa Berry',
    description:
      'One bite of this very tender Berry fills the mouth with its sweet and tangy flavor.',
    pokemonType: PokemonType.Electric,
    strengthChart: [
      25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
      43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 64, 65, 67, 69, 71, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 93,
      95, 97, 100, 102, 105, 107,
    ],
    imageSrc: require('./assets/grepaberry.png'),
  },
  [BerryID.Leppa]: {
    name: 'Leppa Berry',
    description:
      'It takes longer to grow than Berries such as Cheri. The smaller Berries taste better.',
    pokemonType: PokemonType.Fire,
    strengthChart: [
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
      45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 61, 63, 64,
      66, 67, 69, 71, 72, 74, 76, 78, 80, 82, 84, 86, 88, 91, 93, 95, 98, 100,
      102, 105, 108, 110, 113, 116,
    ],
    imageSrc: require('./assets/leppaberry.png'),
  },
  [BerryID.Lum]: {
    name: 'Lum Berry',
    description:
      "This Berry's gradual process of storing nutrients beneficial to Pokémon health causes it to mature slowly.",
    pokemonType: PokemonType.Bug,
    strengthChart: [
      24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
      42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 66, 68, 69, 71, 73, 75, 77, 79, 80, 82, 85, 87, 89,
      91, 93, 96, 98, 101, 103,
    ],
    imageSrc: require('./assets/lumberry.png'),
  },
  [BerryID.Mago]: {
    name: 'Mago Berry',
    description:
      'This Berry progressively curves as it grows. The curvier the Berry, the sweeter it tastes.',
    pokemonType: PokemonType.Psychic,
    strengthChart: [
      26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
      44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 62,
      63, 65, 66, 68, 70, 72, 73, 75, 77, 79, 81, 83, 85, 87, 89, 92, 94, 96,
      99, 101, 104, 106, 109, 112,
    ],
    imageSrc: require('./assets/magoberry.png'),
  },
  [BerryID.Oran]: {
    name: 'Oran Berry',
    description:
      "Nature's gifts came together as one in this Berry. It has a wondrous mix of flavors that spread in the mouth.",
    pokemonType: PokemonType.Water,
    strengthChart: [
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
      49, 50, 51, 52, 53, 55, 56, 57, 59, 60, 62, 63, 65, 67, 68, 70, 72, 74,
      75, 77, 79, 81, 83, 85, 87, 90, 92, 94, 97, 99, 101, 104, 107, 109, 112,
      115, 118, 121, 124, 127, 130, 133,
    ],
    imageSrc: require('./assets/oranberry.png'),
  },
  [BerryID.Pamtre]: {
    name: 'Pamtre Berry',
    description:
      'This Berry drifted from a faraway sea. It can now be cultivated even on this island.',
    pokemonType: PokemonType.Flying,
    strengthChart: [
      24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
      42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 66, 68, 69, 71, 73, 75, 77, 79, 80, 82, 85, 87, 89,
      91, 93, 96, 98, 101, 103,
    ],
    imageSrc: require('./assets/pamtreberry.png'),
  },
  [BerryID.Pecha]: {
    name: 'Pecha Berry',
    description:
      "Because of its hollow inside pocket, there isn't a lot to eat. What can be eaten is very sweet and delicious.",
    pokemonType: PokemonType.Fairy,
    strengthChart: [
      26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
      44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 62,
      63, 65, 66, 68, 70, 72, 73, 75, 77, 79, 81, 83, 85, 87, 89, 92, 94, 96,
      99, 101, 104, 106, 109, 112,
    ],
    imageSrc: require('./assets/pechaberry.png'),
  },
  [BerryID.Persim]: {
    name: 'Persim Berry',
    description:
      'The more this Berry absorbs energy from sunlight, the more vividly colorful it grows.',
    pokemonType: PokemonType.Normal,
    strengthChart: [
      28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
      46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 65, 66,
      68, 70, 72, 73, 75, 77, 79, 81, 83, 85, 87, 89, 92, 94, 96, 99, 101, 104,
      106, 109, 112, 114, 117, 120,
    ],
    imageSrc: require('./assets/persimberry.png'),
  },
  [BerryID.Rawst]: {
    name: 'Rawst Berry',
    description:
      'If the leaves grow longer and curlier than average, this Berry will have a somewhat bitter taste.',
    pokemonType: PokemonType.Ice,
    strengthChart: [
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 54, 55, 56, 58, 59, 61, 62, 64, 65, 67, 69, 71, 72, 74, 76,
      78, 80, 82, 84, 86, 88, 90, 93, 95, 97, 100, 102, 105, 107, 110, 113, 116,
      118, 121, 124, 128, 131, 134, 137,
    ],
    imageSrc: require('./assets/rawstberry.png'),
  },
  [BerryID.Sitrus]: {
    name: 'Sitrus Berry',
    description:
      "Sitrus came from the same family as Oran. It's larger and smoother- tasting than Oran.",
    pokemonType: PokemonType.Rock,
    strengthChart: [
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
      48, 49, 50, 51, 52, 53, 54, 56, 57, 58, 60, 61, 63, 65, 66, 68, 69, 71,
      73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 96, 98, 101, 103, 106, 108,
      111, 114, 117, 120, 123, 126, 129,
    ],
    imageSrc: require('./assets/sitrusberry.png'),
  },
  [BerryID.Wiki]: {
    name: 'Wiki Berry',
    description:
      "It's said that this Berry grew lumps to help Pokémon grip it, allowing propagation farther afield.",
    pokemonType: PokemonType.Dark,
    strengthChart: [
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
      49, 50, 51, 52, 53, 55, 56, 57, 59, 60, 62, 63, 65, 67, 68, 70, 72, 74,
      75, 77, 79, 81, 83, 85, 87, 90, 92, 94, 97, 99, 101, 104, 107, 109, 112,
      115, 118, 121, 124, 127, 130, 133,
    ],
    imageSrc: require('./assets/wikiberry.png'),
  },
  [BerryID.Yache]: {
    name: 'Yache Berry',
    description:
      'This Berry has a refreshing flavor that strikes a good balance of dryness and sourness. It tastes better chilled.',
    pokemonType: PokemonType.Dragon,
    strengthChart: [
      35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53,
      55, 56, 57, 59, 60, 62, 63, 65, 67, 68, 70, 72, 73, 75, 77, 79, 81, 83,
      85, 87, 89, 92, 94, 96, 99, 101, 104, 106, 109, 112, 115, 117, 120, 123,
      126, 130, 133, 136, 140, 143, 147, 150,
    ],
    imageSrc: require('./assets/yacheberry.png'),
  },
};
