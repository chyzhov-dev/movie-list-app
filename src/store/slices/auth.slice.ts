import { authLoginThunk, authRegisterThunk } from '@/store/thunks/auth.thunks';
import { AuthState, Status } from '@/types/store';
import { authRemoveTokenFromStore, authSetTokenToStore } from '@/utils/auth';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: AuthState = {
  status: Status.unset,
  error: undefined,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.error = undefined;
      state.status = Status.unset;

      authRemoveTokenFromStore();
    },
  },
  extraReducers: (builder) => {
    /* -----------------------------------------------------------------------------------------------------*/
    /* @ LOGIN                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(authLoginThunk.pending, (state) => {
      state.status = Status.pending;
      state.error = undefined;
      state.token = null;
    });
    builder.addCase(authLoginThunk.fulfilled, (state, action) => {
      const token = action.payload.accessToken;

      state.token = token;
      state.status = Status.success;

      authSetTokenToStore(token);
    });
    builder.addCase(authLoginThunk.rejected, (state, action) => {
      state.status = Status.error;
      state.error = action.payload?.message;
    });

    /* -----------------------------------------------------------------------------------------------------*/
    /* @ REGISTER                                                                                              */
    /* -----------------------------------------------------------------------------------------------------*/

    builder.addCase(authRegisterThunk.pending, (state) => {
      state.status = Status.pending;
      state.error = undefined;
      state.token = null;
    });
    builder.addCase(authRegisterThunk.fulfilled, (state, action) => {
      const token = action.payload.accessToken;

      state.token = token;
      state.status = Status.success;

      authSetTokenToStore(token);
    });
    builder.addCase(authRegisterThunk.rejected, (state, action) => {
      state.status = Status.error;
      state.error = action.payload?.message;
    });
  }
});

export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
