import { RootState } from './store';
import { fetchMovieList, fetchMovieItem, createMovie, updateMovie, deleteMovie } from '@/store/thunks';
import { MoviesState, Status } from '@/types/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState: MoviesState = {
  list: {
    entities: [],
    status: Status.unset,
    error: undefined,
    page: 1,
    total: 0,
    limit: 8,
  },

  item: {
    id: null,
    status: Status.unset,
    error: undefined,
    data: undefined,
  },
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.list.page = action.payload;
    },
    setSelected: (state, action) => {
      state.item.data = state.list.entities.find(({ id }) => id === action.payload);
    },
    setId: (state, action) => {
      state.item.id = action.payload;
    },
    clearItem: (state) => {
      state.item.data = null;
    },
  },
  extraReducers: (builder) => {
    /* -----------------------------------------------------------------------------------------------------*/
    /* @ LIST                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(fetchMovieList.pending, (state) => {
      state.list.status = Status.pending;
      state.list.error = undefined;
    });
    builder.addCase(fetchMovieList.fulfilled, (state, action) => {
      state.list.entities = action.payload.data;
      state.list.total = action.payload.meta.total;
      state.list.limit = action.payload.meta.limit;
      state.list.status = Status.success;
    });
    builder.addCase(fetchMovieList.rejected, (state, action) => {
      state.list.status = Status.error;
      state.list.error = action.error.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ ITEM                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(fetchMovieItem.pending, (state) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
      state.item.data = undefined;
    });
    builder.addCase(fetchMovieItem.fulfilled, (state, action) => {
      state.item.data = action.payload;
      state.item.status = Status.success;
    });
    builder.addCase(fetchMovieItem.rejected, (state, action) => {
      state.item.status = Status.error;
      state.item.error = action.error.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ CREATE                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(createMovie.pending, (state) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
    });
    builder.addCase(createMovie.fulfilled, (state) => {
      state.item.status = Status.success;
    });
    builder.addCase(createMovie.rejected, (state, action) => {
      state.item.status = Status.error;
      state.item.error = action.error.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ UPDATE                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(updateMovie.pending, (state) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
    });
    builder.addCase(updateMovie.fulfilled, (state) => {
      state.item.status = Status.success;
    });
    builder.addCase(updateMovie.rejected, (state, action) => {
      state.item.status = Status.error;
      state.item.error = action.error.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ DELETE                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(deleteMovie.pending, (state) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
    });
    builder.addCase(deleteMovie.fulfilled, (state) => {
      state.item.status = Status.success;
    });
    builder.addCase(deleteMovie.rejected, (state, action) => {
      state.item.status = Status.error;
      state.item.error = action.error.message;
    });
  }
});

export const { setSelected } = moviesSlice.actions;

export const selectMoviesList = (state: RootState) => state.movies.list.entities;
export const selectMoviesListStatus = (state: RootState) => state.movies.list.status;
export const selectMoviesListTotal = (state: RootState) => state.movies.list.total;
export const selectMoviesListPage = (state: RootState) => state.movies.list.page;
export const selectMoviesListLimit = (state: RootState) => state.movies.list.limit;
export const selectMoviesItemStatus = (state: RootState) => state.movies.item.status;
export const selectMoviesItemError = (state: RootState) => state.movies.item.error;
export const selectMoviesItemSelected = (state: RootState) => state.movies.item.data;
export const selectMoviesItemId = (state: RootState) => state.movies.item.id;

export default moviesSlice.reducer;
