export interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
}

export interface MoviesState {
  list: {
    entities: Movie[];
    status: Status;
    error?: string;
    page: number;
    total: number;
    limit: number;
  };

  item: {
    id: number | null;
    status: Status;
    error?: string;
    data: Movie | null | undefined;
  };
}

export enum Status {
  unset = 'unset',
  pending = 'pending',
  success = 'success',
  error = 'error'
}

export interface CreateUpdateMoviePayload {
  id?: number;
  title: string;
  year: number;
  file?: File | null;
}

export interface MoviesListResponse {
  data: Movie[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface FetchMovieListParams {
  page?: number;
  perPage?: number;
}
