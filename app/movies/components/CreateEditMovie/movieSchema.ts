import { z } from 'zod';

export const movieSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  year: z.number().min(1900, 'Year must be at least 1900').max(new Date().getFullYear(), `Year can't be in the future`),
  base64preview: z.string().optional(),
});