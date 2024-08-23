'use client';
import { DragEndDrop } from '@/components/DragEndDrop';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Controller, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPoster } from '@/utils';
import { useTranslation } from 'react-i18next';
import { movieSchema } from '@/app/movies/components/CreateEditMovie/movieSchema';
import { CreateEditMovieProps, MoviePayload } from '@/app/movies/components/CreateEditMovie/interfaces';

export const CreateEditMovie = ({ onSubmit, isLoading, data, error }: CreateEditMovieProps) => {
  const [base64image, setBase64image] = useState<string | null>();
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const onDrop = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBase64image(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setFile(file);
  }

  const { control, handleSubmit, formState: { errors }  } = useForm<MoviePayload>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: data?.title || '',
      year: data?.year,
      base64preview: ''
    }
  });

  const save = async (data: MoviePayload) => {
    onSubmit({
      ...data,
      file,
    })
  }

  const preview = useMemo(() => {
    if (base64image) {
      return base64image;
    }

    if (data?.poster) {
      return getPoster(data.poster);
    }

    return ''
  }, [base64image, data])

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-24 ">
      <div className='my-2 hidden md:block'>
        <DragEndDrop onDrop={onDrop} value={preview } />
      </div>
      <form onSubmit={handleSubmit(save)} className='p-3'>
        <div className="flex flex-col  h-full">
          <div className="flex flex-col gap-5">
            <Controller
              name="title"
              control={control}
              defaultValue={''}
              render={( { field } ) => {
                return <Input
                  {...field}
                  placeholder={t('title')}
                  disabled={isLoading}
                  error={errors.title?.message}
                />
              }}
            />
            <Controller
              name="year"
              control={control}
              render={( { field } ) => {
                return <Input
                  {...field}
                  placeholder={t('published_at')}
                  disabled={isLoading}
                  error={errors.year?.message}
                  className="md:w-3/5 sm:w-full"
                  onChange={( e ) => {
                    const { value } = e.target;
                    if ( value.length > 4 ) return;
                    field.onChange(isNaN(+e.target.value) ? 1900 : +e.target.value)
                  }}
                />
              }}
            />
          </div>
          <div className='my-6 md:hidden'>
            <DragEndDrop onDrop={onDrop} value={preview}/>
          </div>
          <div className="grid grid-cols-2 gap-4 my-6">
            <Button variant="outline" type="button" onClick={() => router.push('/movies')}>
              {t('cancel')}
            </Button>
            <Button isLoading={isLoading} variant="primary" type='submit'>
              {t('submit')}
            </Button>
          </div>
          {error && <p className="my-3 text-red-500 text-center">{error}</p>}
        </div>
      </form>
    </div>
  )
}