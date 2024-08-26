import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  moviesSlice, selectMoviesItemError,
  selectMoviesItemId,
  selectMoviesItemSelected,
  selectMoviesItemStatus
} from '@/store/slices/movies.slice';
import { moviesCreateThunk, moviesDeleteThunk, moviesFetchItemThunk, moviesUpdateThunk } from '@/store/thunks/movies.thunks';
import { UseMoviesItemParams } from '@/types/hooks';
import { CreateUpdateMoviePayload } from '@/types/store';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useMoviesItem = (params: UseMoviesItemParams) => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectMoviesItemId);
  const data = useAppSelector(selectMoviesItemSelected);
  const status = useAppSelector(selectMoviesItemStatus);
  const error = useAppSelector(selectMoviesItemError);
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
  }, [autoloadState, id]);

  const load = () => {
    id && dispatch(moviesFetchItemThunk(id));
  };

  const create = (data: CreateUpdateMoviePayload) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data;

    return dispatch(moviesCreateThunk(rest)).unwrap();
  };

  const update = async (data: CreateUpdateMoviePayload) => {
    if (!id) {
      return;
    }

    return dispatch(moviesUpdateThunk({
      ...data,
      id,
    })).unwrap();
  };

  const remove = async () => {
    if (!id) {
      return;
    }

    return dispatch(moviesDeleteThunk(id)).unwrap();
  };

  const setId = (id: number) => {
    dispatch(moviesSlice.actions.setId(id));
  };

  const clear = () => {
    dispatch(moviesSlice.actions.clearItem());
  };

  return {
    id,
    data,
    status,
    error,
    setId,
    create,
    update,
    remove,
    load,
    setAutoloadState,
    clear,
  };
};
