/**
 * Sleep styles.
 */
export enum SleepType {
  Dozing = 'Dozing',
  Snoozing = 'Snoozing',
  Slumbering = 'Slumbering',
}

/**
 * Types of Pokemon.
 */
export enum PokemonType {
  Grass = 'Grass',
  Fire = 'Fire',
  Water = 'Water',
  Bug = 'Bug',
  Normal = 'Normal',
  Poison = 'Poison',
  Electric = 'Electric',
  Fairy = 'Fairy',
  Ground = 'Ground',
  Fighting = 'Fighting',
  Rock = 'Rock',
  Steel = 'Steel',
  Flying = 'Flying',
  Ghost = 'Ghost',
  Psychic = 'Psychic',
  Dark = 'Dark',
  Dragon = 'Dragon',
  Ice = 'Ice',
}

/**
 * Pokemon specialty.
 */
export enum PokemonSpecialty {
  Ingredients = 'Ingredients',
  Berries = 'Berries',
  Skills = 'Skills',
}

type GrowToSize<T, N extends number, A extends T[]> = A['length'] extends N
  ? A
  : GrowToSize<T, N, [...A, T]>;

/**
 * Fixed array type.
 */
export type FixedArray<T, N extends number> = GrowToSize<T, N, []>;
