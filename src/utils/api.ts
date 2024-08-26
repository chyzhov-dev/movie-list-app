'use client';
import { ErrorType, HttpResponseErrorType, ResponseBodyFailed } from '@/types/http';
import axios from 'axios';
import { isUndefined, omitBy } from 'lodash';

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  signal: new AbortController().signal,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const handleHttpError = (error: HttpResponseErrorType): ResponseBodyFailed => ({
  ok: false,
  // data: null,
  // status: error.status ?? 500,
  error: omitBy<ErrorType>({
    code: error?.response?.status || 0,
    name: error?.response?.data?.name || 'error',
    message: error?.response?.data?.message || 'Uncaught server error, please try again later',
    fields: error.response?.data?.fields,
  }, isUndefined) as ErrorType,
});
