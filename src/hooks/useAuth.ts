import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { selectAuthError, selectAuthStatus, selectAuthToken } from '@/store/slices/auth.slice';
import { authLoginThunk, authRegisterThunk } from '@/store/thunks/auth.thunks';
import { AuthLoginPayload, AuthRegisterPayload } from '@/types/store';

export const useAuth = () => {
  const token = useAppSelector(selectAuthToken);
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const dispatch = useAppDispatch();

  const login = (data: AuthLoginPayload) => {
    return dispatch(authLoginThunk(data)).unwrap();
  };

  const registration = (data: AuthRegisterPayload) => {
    return dispatch(authRegisterThunk(data)).unwrap();
  };

  return {
    token,
    status,
    error,
    login,
    registration,
  };
};
