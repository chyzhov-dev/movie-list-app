'use client';
import { Header } from '@/components/Header';
import { MovieForm } from '@/components/MovieForm';
import { PageContainer } from '@/components/PageContainer';
import { useMoviesItem } from '@/hooks/useMoviesItem';
import { useMoviesList } from '@/hooks/useMoviesList';
import { MoviePayload } from '@/types/components';
import { Status } from '@/types/store';
import { useParams, useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const EditPage = (): ReactElement => {
  const params = useParams();
  const { t } = useTranslation();
  const router = useRouter();
  const list = useMoviesList({});
  const item = useMoviesItem({
    autoload: true,
  });

  useEffect(() => {
    item.setId(Number(params.id));

    return () => {
      item.clear();
    };
  }, []);

  const handleSubmit = async (data: MoviePayload) => {
    item
      .update(data)
      .catch(() => {
        toast(t('notification.update_error'), { type: 'error' });
      })
      .then((value: unknown) => {
        value && toast(t('notification.update_success'), { type: 'success' });
        returnToList();
      });
  };

  const handleDelete = async () => {
    item
      .remove()
      .catch(() => {
        toast(t('notification.delete_error'), { type: 'error' });
      })
      .then((value: unknown) => {
        value && toast(t('notification.delete_success'), { type: 'success' });
        returnToList();
      });
  };

  const returnToList = () => {
    const page = list.page !== 1 ? `?page=${list.page}` : '';

    router.push(`/movies${page}`);
  };

  return (
    <PageContainer
      status={item.status}
      title={
        <Header>
          {t('title.edit_movie')}
        </Header>
      }
    >
      <MovieForm
        mode="edit"
        onSubmit={handleSubmit}
        onCancel={returnToList}
        onDelete={handleDelete}
        data={item.data ?? undefined}
        error={item.error}
        isLoading={item.status === Status.pending}
      />
    </PageContainer>
  );
};

export default EditPage;
