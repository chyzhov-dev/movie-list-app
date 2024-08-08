'use client';
import { DragEndDrop } from '@/components/DragEndDrop';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const movieSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  year: z.number().min(1900, 'Year must be at least 1900').max(new Date().getFullYear(), `Year can't be in the future`),
  base64preview: z.string().optional(),
});

interface CreateEditMovieProps {
  onSubmit: (data: MoviePayload) => void;
  isLoading?: boolean;
  data?: MoviePayload
}

export type MoviePayload = {
  name: string;
  year: number | string;
  base64preview: string;
}

export const CreateEditMovie: React.FC<CreateEditMovieProps> = ({ onSubmit, isLoading, data }: CreateEditMovieProps) => {
  const [base64image, setBase64image] = useState<string | null>(data?.base64preview || null);
  const router = useRouter();
  const onDrop = (file: File) => {const reader = new FileReader();
    reader.onload = (e) => {
      setBase64image(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  const { control, handleSubmit, formState: { errors }  } = useForm<MoviePayload>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      name: data?.name || '',
      year: data?.year,
      base64preview: ''
    }
  });

  const save = async (data: MoviePayload) => {
    onSubmit({
      ...data,
      base64preview: base64image || ''
    })
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
      <div className='my-4'>
        <DragEndDrop onDrop={onDrop} value={data?.base64preview} />
      </div>
      <form onSubmit={handleSubmit(save)} className='p-3'>
        <div className="flex flex-col  h-full">
          <div className="flex flex-col gap-5">
            <Controller
              name="name"
              control={control}
              defaultValue={''}
              render={({ field }) => {
                return <Input
                  {...field}
                  placeholder="Title"
                  disabled={isLoading}
                  error={errors.name?.message}
                />
              }}
            />
            <Controller
              name="year"
              control={control}
              render={({ field }) => {
                return <Input
                  {...field}
                  placeholder="Publishing year"
                  disabled={isLoading}
                  error={errors.year?.message}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value.length > 4) return;
                    field.onChange(isNaN(+e.target.value) ? 1900 : +e.target.value)
                  }}
                />
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 my-10">
            <Button variant="outline" type="button" onClick={() => router.push('/movies')}>
              Cancel
            </Button>
            <Button isLoading={isLoading} variant="primary" type='submit'>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  )}