export const getPoster = (path?: string) => {
  if (!path) {
    return '/images/no-image.svg';
  }

  return `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
};
