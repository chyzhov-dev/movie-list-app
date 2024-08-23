export interface CreateEditMovieProps {
  onSubmit: (data: MoviePayload) => void;
  isLoading?: boolean;
  data?: MoviePayload
  error?: string;
}

export type MoviePayload = {
  title: string;
  year: number;
  base64preview?: string;
  file?: File | null;
  poster?: string;
}