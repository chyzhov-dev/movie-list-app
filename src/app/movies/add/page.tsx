'use client';
import { Header } from '@/components/Header';
import { MovieForm } from '@/components/MovieForm';
import { PageContainer } from '@/components/PageContainer';
import { useMoviesItem } from '@/hooks/useMoviesItem';
import { useMoviesList } from '@/hooks/useMoviesList';
import { MoviePayload } from '@/types/components';
import { Status } from '@/types/store';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const CreatePage = (): ReactElement => {
  const router = useRouter();
  const { t } = useTranslation();
  const list = useMoviesList({});
  const item = useMoviesItem({});

  const handleSubmit = async (data: MoviePayload) => {
    item
      .create(data)
      .catch(() => {
        toast(t('notification.create_error'), { type: 'error' });
      })
      .then(() => {
        toast(t('notification.create_success'), { type: 'success' });
        returnToList();
      });
  };

  const returnToList = () => {
    const page = list.page !== 1 ? `?page=${list.page}` : '';

    router.push(`/movies${page}`);
  };

  return (
    <PageContainer
      title={
        <Header>
          {t('title.create_movie')}
        </Header>
      }
    >
      <MovieForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={returnToList}
        isLoading={item.status === Status.pending}
        error={item.error}
      />
    </PageContainer>
  );
};

export default CreatePage;
