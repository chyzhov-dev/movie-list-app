import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { Movie } from '@/app/movies/store/interfaces';
import { fetchMovieList, findMovieById } from '@/app/movies/store/thunks';

interface MoviesState {
  list: Movie[],
  isLoading: boolean,
  error?: string,
  selected: Movie | null | undefined,
  pagination: {
    page: number,
    total: number,
    perPage: number,
  }
}

const initialState: MoviesState = {
  list: [],
  isLoading: false,
  error: undefined,
  selected: null,
  pagination: {
    page: 1,
    total: 0,
    perPage: 10,
  }
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelected: ( state, action ) => {
      state.selected = state.list.find(( { id } ) => id === action.payload);
    },
  },
  extraReducers: ( builder ) => {
    builder.addCase(fetchMovieList.pending, ( state, action ) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchMovieList.fulfilled, ( state, action ) => {
      state.list = action.payload.data;
      state.pagination = action.payload.meta;
      state.isLoading = false;
    });
    builder.addCase(fetchMovieList.rejected, ( state, action ) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(findMovieById.fulfilled, ( state, action ) => {
      state.selected = action.payload;
    });
  }
});


export const { setSelected } = moviesSlice.actions;

export const selectMovies = ( state: RootState ) => state.movies.list;
export const selectPagination = ( state: RootState ) => state.movies.pagination;

export default moviesSlice.reducer;