import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pokemonSlice from './slice/pokemonSlice'

export const store = configureStore({
  reducer: {
    pokedex: pokemonSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
