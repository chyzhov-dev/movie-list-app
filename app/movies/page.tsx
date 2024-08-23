'use client';
import { MovieCard } from '@/components/MovieCard';
import { PlusButton } from '@/components/PlusButton';
import { Pagination } from '@/components/Pagination';
import { Button } from '@/components/Button';
import { LogoutIcon } from '@/components/icons/LogoutIcon';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectMovies, selectPagination } from '@/app/movies/store/movies.slice';
import { useEffect } from 'react';
import { fetchMovieList } from '@/app/movies/store/thunks';
import { getPoster } from '@/utils';
import { useRouter } from 'next/navigation';
import { deleteToken } from '@/app/movies/actions';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Header } from '@/components/Header';
import { LanguageSwitch } from '@/components/LanguageSwitch';

const ListPage = () => {

  const movies = useAppSelector(selectMovies);
  const pagination = useAppSelector(selectPagination);
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieList());
  }, [ dispatch ]);

  const handleLogout = async () => {
    await deleteToken();
    localStorage.removeItem('token');
    router.push('/login');
  };

  const hasMovies = !!movies.length;

  return (
    <div className="h-full">
      <div className={clsx('flex items-center', { 'justify-between': hasMovies, 'justify-end': !hasMovies  })}>
        { hasMovies && (
          <h2 className="font-medium md:text-5xl sm:text-3xl flex items-center my-10 ml-2 ">
            {t('my_movies')}
            <a className="ml-2 mt-1 hover:scale-105 transition duration-300 sm:scale-75 md:scale-100"
               href="movies/add">
              <PlusButton/>
            </a>
          </h2>
        )}
        <div className="flex">
          <LanguageSwitch/>
          <Button onClick={handleLogout} className="flex  align-middle justify-center items-center gap-1">
            <span className="hidden md:block">{t('logout')}</span>
            <LogoutIcon/>
          </Button>
        </div>
      </div>

      <div className={clsx('min-h-[75svh] flex flex-col ', { 'justify-center': !movies.length })}>
        <div className="md:mt-8 sm:mt-2">
          {!movies.length && (
            <div className="flex flex-col gap-8 justify-center items-center">
              <Header>
                {t('empty_movies')}
              </Header>
              <a href="/movies/add">
                <Button variant="primary">{t('add_movie')}</Button>
              </a>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
            {movies.map(( movie ) => {
              return (
                <a key={movie.id} href={`/movies/edit/${movie.id}`}>
                  <MovieCard
                    title={movie.title}
                    description={''}
                    year={+movie.year}
                    image={getPoster(movie.poster)}
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="my-16">
          <Pagination
            page={pagination.page}
            total={pagination.total}
            perPage={pagination.perPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPage;