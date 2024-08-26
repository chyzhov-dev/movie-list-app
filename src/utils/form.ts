import { CreateUpdateMoviePayload } from '@/types/store';

export const createPayload = (data: CreateUpdateMoviePayload) => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('year', data.year.toString());

  if (data.file) {
    formData.append('file', data.file);
  }

  return formData;
};
