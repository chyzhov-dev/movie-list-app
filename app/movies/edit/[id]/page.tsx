'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { CreateEditMovie } from '@/app/movies/components/CreateEditMovie/CreateEditMovie';
import { findMovieById, updateMovieById } from '@/app/movies/store/thunks';
import { Header } from '@/components/Header';
import { useTranslation } from 'react-i18next';
import { MoviePayload } from '@/app/movies/components/CreateEditMovie/interfaces';

export default function EditPage() {

  const params = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const selected = useAppSelector(state => state.movies.selected);

  useEffect(() => {
    dispatch(findMovieById(+params.id));
  }, [ params.id, dispatch ]);

  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const onSubmit = async ( data: MoviePayload ) => {
    try {
      setIsLoading(true);
      await dispatch(updateMovieById({
        id: +params.id,
        ...data
      }));
      router.push('/movies');
    } catch (e) {
      alert('An error occurred');
    }
  };

  return (
    <div className="md:container sm:p-1 w-full">
      <Header>
        {t('edit_movie')}
      </Header>
      {selected && (
        <CreateEditMovie onSubmit={onSubmit} data={selected} isLoading={isLoading}/>
      )}
    </div>
  );
}