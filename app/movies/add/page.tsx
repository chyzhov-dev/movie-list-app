'use client';
import { CreateEditMovie } from '@/app/movies/components/CreateEditMovie/CreateEditMovie';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { useTranslation } from 'react-i18next';
import { useMovie } from '@/app/movies/hooks/useMovie';
import { MoviePayload } from '@/app/movies/components/CreateEditMovie/interfaces';

const CreatePage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { create, isLoading, error } = useMovie();

  const onSubmit = async ( data: MoviePayload ) => {
    const response = await create(data);
    if (response) {
      router.push('/movies');
    }
  };

  return (
    <div className="md:container sm:p-1 w-full">
      <Header>{t('create_movie')}</Header>
      <CreateEditMovie onSubmit={onSubmit} isLoading={isLoading} error={error}/>
    </div>
  );
};

export default CreatePage;