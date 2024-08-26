import { CreateUpdateMoviePayload, FetchMovieListParams, Movie, MoviesListResponse } from '@/types/store';
import { apiClient } from '@/utils/api';
import { createPayload } from '@/utils/form';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovieList = createAsyncThunk<
  MoviesListResponse,
  FetchMovieListParams
>('movies/list', async (params) => {
  const response = await apiClient.get<MoviesListResponse>('movies', { params });

  return response.data;
});

export const createMovie = createAsyncThunk<
  Movie,
  CreateUpdateMoviePayload
>('movies/create', async (data) => {
  const response = await apiClient.post<Movie>('movies', createPayload(data));

  return response.data;
});

export const fetchMovieItem = createAsyncThunk<
  Movie,
  number
>('movies/item', async (id) => {
  const response = await apiClient.get<Movie>(`movies/${id}`);

  return response.data;
});

export const updateMovie = createAsyncThunk<
  Movie,
  CreateUpdateMoviePayload
>('movies/update', async (data) => {
  const response = await apiClient.patch<Movie>(`movies/${data.id}`, createPayload(data));

  return response.data;
});

export const deleteMovie = createAsyncThunk<
  unknown,
  number
>('movies/delete', async (id) => {
  const response = await apiClient.delete<Movie>(`movies/${id}`);

  return response.data;
});

