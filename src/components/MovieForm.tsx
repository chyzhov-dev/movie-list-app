'use client';
import { Button } from '@/components/Button';
import { DragEndDrop } from '@/components/DragEndDrop';
import { Input } from '@/components/Input';
import { useDeviceSizes } from '@/hooks/useMediaSize';
import { MovieFormProps, MoviePayload } from '@/types/components';
import { getPoster } from '@/utils/poster';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const movieSchema = z.object({
  title: z
    .string()
    .min(1, 'Name is required'),
  year: z
    .number()
    .min(1900, 'Year must be at least 1900')
    .max(new Date().getFullYear(), 'Year can\'t be in the future'),
  base64preview: z
    .string()
    .optional(),
});

export const MovieForm = (props: MovieFormProps): ReactElement => {
  const {
    isLoading,
    data,
    error,
    mode = 'create',
    onSubmit,
    onCancel,
    onDelete,
  } = props;

  const [base64image, setBase64image] = useState<string | null>();
  const [file, setFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const { isMD } = useDeviceSizes();

  const onDrop = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setBase64image(e.target?.result as string);
    };

    reader.readAsDataURL(file);
    setFile(file);
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm<MoviePayload>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: data?.title || '',
      year: data?.year,
      base64preview: ''
    }
  });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  const save = async (data: MoviePayload) => {
    onSubmit({
      ...data,
      file,
    });
  };

  const preview = useMemo(() => {
    if (base64image) {
      return base64image;
    }

    if (data?.poster) {
      return getPoster(data.poster);
    }

    return '';
  }, [base64image, data]);

  return (
    <div className="grid grid-cols-12 md:gap-6 gap-2">
      {isMD && (
        <div className="hidden md:block md:col-span-5 col-span-12">
          <DragEndDrop onDrop={onDrop} value={preview}/>
        </div>
      )}
      <form onSubmit={handleSubmit(save)} className="md:col-start-7 md:col-span-5 col-span-12">
        <div className="flex flex-col h-full gap-6">
          <div className="flex flex-col gap-6">
            <Controller
              name="title"
              control={control}
              defaultValue={control._defaultValues.title ?? ''}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t('form.title')}
                  disabled={isLoading}
                  error={errors.title?.message}
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              defaultValue={control._defaultValues.year ?? 0}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t('form.published_at')}
                  disabled={isLoading}
                  error={errors.year?.message}
                  className="md:w-3/5 sm:w-full"
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value.length > 4) return;
                    field.onChange(isNaN(+e.target.value) ? 1900 : +e.target.value);
                  }}
                />
              )}
            />
          </div>
          {!isMD && (
            <div>
              <DragEndDrop onDrop={onDrop} value={preview}/>
            </div>
          )}
          <div className={clsx(
            'grid gap-4 mt-6',
            {
              'grid-cols-3': mode === 'edit',
              'grid-cols-2': mode !== 'edit',
            }
          )}>
            <Button
              variant="outline"
              type="button"
              onClick={() => onCancel && onCancel()}
            >
              {t('form.cancel')}
            </Button>
            {mode === 'edit' && (
              <Button
                isLoading={isLoading}
                variant="danger"
                onClick={() => onDelete && onDelete()}
              >
                {t('form.delete')}
              </Button>
            )}
            <Button
              isLoading={isLoading}
              variant="primary"
              type="submit"
            >
              {t(mode === 'create' ? 'form.submit' : 'form.update')}
            </Button>
          </div>
          {error && <p className="my-3 text-red-500 text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
};
