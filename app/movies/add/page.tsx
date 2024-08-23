'use client';
import { CreateEditMovie, MoviePayload } from '@/components/CreateEditMovie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks';
import { createMovie } from '@/app/movies/store/thunks';
import { Header } from '@/components/Header';
import { useTranslation } from 'react-i18next';

const CreatePage = () => {
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = async ( data: MoviePayload ) => {
    try {
      setIsLoading(true);
      await dispatch(createMovie(data));
      router.push('/movies');
    } catch (error) {
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:container mx-auto lg:px-20 sm:p-1 w-full">
      <Header>{t('create_movie')}</Header>
      <CreateEditMovie onSubmit={onSubmit} isLoading={isLoading}/>
    </div>
  );
};

export default CreatePage;