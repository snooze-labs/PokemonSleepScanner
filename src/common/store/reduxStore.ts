import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice from './pokemonSlice';
import cookingSlice from './cookingSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
    cooking: cookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
