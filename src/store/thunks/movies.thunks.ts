import { BaseAsyncThunkOptions, HttpResponseErrorType } from '@/types/http';
import { CreateUpdateMoviePayload, FetchMovieListParams, Movie, MoviesListResponse } from '@/types/store';
import { apiClient, handleHttpError } from '@/utils/api';
import { createPayload } from '@/utils/form';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const moviesFetchMovieList = createAsyncThunk<
  MoviesListResponse,
  FetchMovieListParams,
  BaseAsyncThunkOptions
>('movies/list', async (params, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<MoviesListResponse>('movies', { params });

    return response.data;
  } catch (e) {
    return rejectWithValue(handleHttpError(e as HttpResponseErrorType).error);
  }
});

export const moviesCreateThunk = createAsyncThunk<
  Movie,
  CreateUpdateMoviePayload,
  BaseAsyncThunkOptions
>('movies/create', async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<Movie>('movies', createPayload(data));

    return response.data;
  } catch (e) {
    return rejectWithValue(handleHttpError(e as HttpResponseErrorType).error);
  }
});

export const moviesFetchItemThunk = createAsyncThunk<
  Movie,
  number,
  BaseAsyncThunkOptions
>('movies/item', async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<Movie>(`movies/${id}`);

    return response.data;
  } catch (e) {
    return rejectWithValue(handleHttpError(e as HttpResponseErrorType).error);
  }
});

export const moviesUpdateThunk = createAsyncThunk<
  Movie,
  CreateUpdateMoviePayload,
  BaseAsyncThunkOptions
>('movies/update', async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.patch<Movie>(`movies/${data.id}`, createPayload(data));

    return response.data;
  } catch (e) {
    return rejectWithValue(handleHttpError(e as HttpResponseErrorType).error);
  }
});

export const moviesDeleteThunk = createAsyncThunk<
  unknown,
  number,
  BaseAsyncThunkOptions
>('movies/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient.delete<Movie>(`movies/${id}`);

    return response.data;
  } catch (e) {
    return rejectWithValue(handleHttpError(e as HttpResponseErrorType).error);
  }
});

