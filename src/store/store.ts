import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '@/store/slices/movies.slice';
import authReducer from '@/store/slices/auth.slice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
