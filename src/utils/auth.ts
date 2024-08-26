export const authSetTokenToStore = (token: string): void => {
  localStorage.setItem('token', token);
};

export const authRemoveTokenFromStore = () => {
  localStorage.removeItem('token');
};
