import { Dispatch, configureStore } from '@reduxjs/toolkit';
import pokemonSlice from './pokemonSlice';
import cookingSlice, { initialize } from './cookingSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
    cooking: cookingSlice,
  },
});

export async function initializeStore(dispatch: Dispatch) {
  await initialize(dispatch);
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
