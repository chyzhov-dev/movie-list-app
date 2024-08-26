import { RootState } from '@/store';
import { AxiosError } from 'axios';

export type HttpResponseErrorType = AxiosError<{
  name: string;
  message: string;
  fields: Record<string, string[]>;
}>;

export interface ResponseBodyFailed {
  ok: false;
  // status: number;
  // data: null;
  error: ErrorType;
}

export interface ErrorType {
  message: string;
  name: string;
  fields?: Record<string, string[]>;
  code?: number;
}

export interface BaseAsyncThunkOptions<E = ErrorType, S = RootState> {
  rejectValue: E;
  state: S;
}
