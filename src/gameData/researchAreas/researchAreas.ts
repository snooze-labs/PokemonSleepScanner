export enum ResearchAreaID {
  GreengrassIsle = 'greengrassisle',
  CyanBeach = 'cyanbeach',
  TaupeHollow = 'taupehollow',
  SnowdropTundra = 'snowdroptundra',
}

export interface IResearchAreaData {
  name: string;
  description: string;
  sleepStylesToUnlock: number;
}

export const ResearchAreas: { [key in ResearchAreaID]: IResearchAreaData } = {
  [ResearchAreaID.GreengrassIsle]: {
    name: 'Greengrass Isle',
    description:
      'The largest island in the region, known for its fertile land covered with greenery. It hosts the greatest variety of Pokémon.',
    sleepStylesToUnlock: 0,
  },
  [ResearchAreaID.CyanBeach]: {
    name: 'Cyan Beach',
    description:
      'This shore of fine white sand stretches to the horizon, kissed by a gentle sea breeze. Many Water-type Pokémon live here.',
    sleepStylesToUnlock: 20,
  },
  [ResearchAreaID.TaupeHollow]: {
    name: 'Taupe Hollow',
    description:
      'Shafts of sunlight pour through the open ceiling to light up the cavern walls. Rock- and Ground-type Pokémon love it here.',
    sleepStylesToUnlock: 70,
  },
  [ResearchAreaID.SnowdropTundra]: {
    name: 'Snowdrop Tundra',
    description:
      'Gorgeous flowers bloom in this freezing tundra, despite the unrelenting snowfall. Many Ice-type Pokémon can be found here.',
    sleepStylesToUnlock: 150,
  },
};
