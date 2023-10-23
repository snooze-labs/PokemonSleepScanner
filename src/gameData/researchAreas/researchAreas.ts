import { ImageURISource } from 'react-native';

/**
 * All known research area IDs.
 */
export enum ResearchAreaID {
  GreengrassIsle = 'greengrassisle',
  CyanBeach = 'cyanbeach',
  TaupeHollow = 'taupehollow',
  SnowdropTundra = 'snowdroptundra',
}

/**
 * Represents a research area in Pokemon Sleep.
 */
export interface IResearchAreaData {
  name: string;
  description: string;
  sleepStylesToUnlock: number;
  imageSrc: ImageURISource;
}

/**
 * Map of all known research areas.
 */
export const ResearchAreas: { [key in ResearchAreaID]: IResearchAreaData } = {
  [ResearchAreaID.GreengrassIsle]: {
    name: 'Greengrass Isle',
    description:
      'The largest island in the region, known for its fertile land covered with greenery. It hosts the greatest variety of Pokémon.',
    sleepStylesToUnlock: 0,
    imageSrc: require('./assets/greengrassisle.jpg'),
  },
  [ResearchAreaID.CyanBeach]: {
    name: 'Cyan Beach',
    description:
      'This shore of fine white sand stretches to the horizon, kissed by a gentle sea breeze. Many Water-type Pokémon live here.',
    sleepStylesToUnlock: 20,
    imageSrc: require('./assets/cyanbeach.jpg'),
  },
  [ResearchAreaID.TaupeHollow]: {
    name: 'Taupe Hollow',
    description:
      'Shafts of sunlight pour through the open ceiling to light up the cavern walls. Rock- and Ground-type Pokémon love it here.',
    sleepStylesToUnlock: 70,
    imageSrc: require('./assets/taupehollow.jpg'),
  },
  [ResearchAreaID.SnowdropTundra]: {
    name: 'Snowdrop Tundra',
    description:
      'Gorgeous flowers bloom in this freezing tundra, despite the unrelenting snowfall. Many Ice-type Pokémon can be found here.',
    sleepStylesToUnlock: 150,
    imageSrc: require('./assets/snowdroptundra.jpg'),
  },
};

/**
 * Helper to get research area data by ID.
 */
export function getResearchData(id: ResearchAreaID) {
  return ResearchAreas[id];
}
