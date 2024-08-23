import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/api';
import { Movie } from '@/app/movies/store/interfaces';

interface MoviesListResponse {
  data: Movie[],
  meta: {
    total: number,
    page: number,
    perPage: number,
  }
}

export const fetchMovieList = createAsyncThunk<MoviesListResponse>('movies/list', async () => {
  const response = await apiClient.get<MoviesListResponse>(`movies`);
  return response.data;
});

interface CreateUpdateMoviePayload {
  id?: number,
  title: string,
  year: number,
  file?: File | null,
}

const makeFormData = ( data: CreateUpdateMoviePayload ) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('year', data.year.toString());
  if ( data.file ) {
    formData.append('file', data.file);
  }
  return formData;
};
export const createMovie = createAsyncThunk<Movie, CreateUpdateMoviePayload>('movies/create', async ( data ) => {
  const response = await apiClient.post<Movie>('movies', makeFormData(data));
  return response.data;
});

export const findMovieById = createAsyncThunk<Movie, number>('movies/findById', async ( id ) => {
  const response = await apiClient.get<Movie>(`movies/${id}`);
  return response.data;
});

export const updateMovieById = createAsyncThunk<Movie, CreateUpdateMoviePayload>('movies/update', async ( data ) => {
  const response = await apiClient.patch<Movie>(`movies/${data.id}`, makeFormData(data));
  return response.data;
});