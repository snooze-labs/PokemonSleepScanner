/**
 * Represents a pokemon in the box.
 */
export interface IPokemon {
  id: string;

  // TODO: fill this out
}

/**
 * Main application state.
 */
export interface IMainApplicationState {
  pokemonList: IPokemon[];
}

export type MainApplicationStateSetter = (
  state: Partial<IMainApplicationState>,
) => void;
