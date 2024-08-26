import { BaseAsyncThunkOptions, HttpResponseErrorType } from '@/types/http';
import { AuthLoginPayload, AuthRegisterPayload, AuthResponse } from '@/types/store';
import { apiClient, handleHttpError } from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const authRegisterThunk = createAsyncThunk<
  AuthResponse,
  AuthRegisterPayload,
  BaseAsyncThunkOptions
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<AuthResponse>('auth/register', data);

    return response.data;
  } catch (e) {
    return rejectWithValue(handleHttpError(e as HttpResponseErrorType).error);
  }
});

export const authLoginThunk = createAsyncThunk<
  AuthResponse,
  AuthLoginPayload,
  BaseAsyncThunkOptions
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<AuthResponse>('auth/login', data);

    return response.data;
  } catch (e) {
    return rejectWithValue(handleHttpError(e as HttpResponseErrorType).error);
  }
});

