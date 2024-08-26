import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  moviesSlice,
  selectMoviesList,
  selectMoviesListLimit,
  selectMoviesListPage,
  selectMoviesListStatus,
  selectMoviesListTotal
} from '@/store/movies.slice';
import { fetchMovieList } from '@/store/thunks';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { UseMoviesListParams } from '@/types/hooks';

export const useMoviesList = (params: UseMoviesListParams = {}) => {
  const movies = useAppSelector(selectMoviesList);
  const status = useAppSelector(selectMoviesListStatus);
  const total = useAppSelector(selectMoviesListTotal);
  const limit = useAppSelector(selectMoviesListLimit);
  const page = useAppSelector(selectMoviesListPage);
  const dispatch = useAppDispatch();
  const [autoloadState, setAutoloadState] = useState(params.autoload ?? false);

  useEffect(() => {
    if (!autoloadState) {
      return;
    }

    const loadDebounce = debounce(load, 400);

    loadDebounce();

    return () => {
      loadDebounce.cancel();
    };
  }, [autoloadState, page]);

  const load = () => {
    dispatch(fetchMovieList({ page }));
  };

  const changePage = (page: number) => {
    dispatch(moviesSlice.actions.setPage(page));
  };

  return {
    movies,
    status,
    page,
    total,
    limit,
    load,
    changePage,
    setAutoloadState,
  };
};
