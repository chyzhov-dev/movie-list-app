import { authSlice } from '@/store/slices/auth.slice';
import {
  moviesCreateThunk, moviesDeleteThunk,
  moviesFetchItemThunk,
  moviesFetchMovieList,
  moviesUpdateThunk
} from '@/store/thunks/movies.thunks';
import { RootState } from '../store';
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
      state.item.error = undefined;
    },
  },
  extraReducers: (builder) => {
    /* -----------------------------------------------------------------------------------------------------*/
    /* @ LIST                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(moviesFetchMovieList.pending, (state) => {
      state.list.status = Status.pending;
      state.list.error = undefined;
    });
    builder.addCase(moviesFetchMovieList.fulfilled, (state, action) => {
      state.list.entities = action.payload.data;
      state.list.total = action.payload.meta.total;
      state.list.limit = action.payload.meta.limit;
      state.list.status = Status.success;
    });
    builder.addCase(moviesFetchMovieList.rejected, (state, action) => {
      state.list.status = Status.error;
      state.list.error = action.payload?.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ ITEM                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(moviesFetchItemThunk.pending, (state) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
      state.item.data = undefined;
    });
    builder.addCase(moviesFetchItemThunk.fulfilled, (state, action) => {
      state.item.data = action.payload;
      state.item.status = Status.success;
    });
    builder.addCase(moviesFetchItemThunk.rejected, (state, action) => {
      state.item.status = Status.error;
      state.item.error = action.payload?.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ CREATE                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(moviesCreateThunk.pending, (state) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
    });
    builder.addCase(moviesCreateThunk.fulfilled, (state) => {
      state.item.status = Status.success;
    });
    builder.addCase(moviesCreateThunk.rejected, (state, action) => {
      state.item.status = Status.error;
      state.item.error = action.payload?.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ UPDATE                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(moviesUpdateThunk.pending, (state) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
    });
    builder.addCase(moviesUpdateThunk.fulfilled, (state) => {
      state.item.status = Status.success;
    });
    builder.addCase(moviesUpdateThunk.rejected, (state, action) => {
      state.item.status = Status.error;
      state.item.error = action.payload?.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ DELETE                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(moviesDeleteThunk.pending, (state) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
    });
    builder.addCase(moviesDeleteThunk.fulfilled, (state) => {
      state.item.status = Status.success;
    });
    builder.addCase(moviesDeleteThunk.rejected, (state, action) => {
      state.item.status = Status.error;
      state.item.error = action.payload?.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ LOGOUT                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(authSlice.actions.logout, () => {
      return initialState;
    });
  }
});

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
