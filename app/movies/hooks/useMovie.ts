import { useAppDispatch, useAppSelector } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import { findMovieById } from '@/app/movies/store/thunks';
import { RootState } from '@/store';
import { apiClient } from '@/api';
import { Movie } from '@/app/movies/store/interfaces';

interface CreateUpdateMoviePayload {
  id?: number,
  title: string,
  year: number,
  file?: File | null,
}

const createPayload = ( data: CreateUpdateMoviePayload ) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('year', data.year.toString());
  if ( data.file ) {
    formData.append('file', data.file);
  }
  return formData;
};

export const useMovie = (id?: number) => {
  const movie = useAppSelector((state: RootState) => state.movies.list.find((movie) => movie.id === id));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const dispatch = useAppDispatch();

  const create = useCallback(async (data: CreateUpdateMoviePayload) => {
      try {
        setError('');
        setIsLoading(true);
        return await apiClient.post<Movie>('movies', createPayload(data));
      } catch (error: any) {
        setError(error?.response?.data?.message);
        debugger;
      } finally {
        setIsLoading(false);
      }}
  , []);

  useEffect(() => {
    id && dispatch(findMovieById(id));
  }, [id, dispatch]);

  return {
    movie,
    isLoading,
    error,
    create
  };
}