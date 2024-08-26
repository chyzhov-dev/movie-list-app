'use client';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import { MovieCard } from '@/components/MovieCard';
import { PageContainer } from '@/components/PageContainer';
import { Pagination } from '@/components/Pagination';
import { PlusButton } from '@/components/PlusButton';
import { useMoviesList } from '@/hooks/useMoviesList';
import { LogoutIcon } from '@/icons/LogoutIcon';
import { getPoster } from '@/utils/poster';
import { deleteToken } from '@/utils/actions';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ListPage = (): ReactElement => {
  const router = useRouter();
  const { t } = useTranslation();
  const queryParameters = useSearchParams();
  const page = Number(queryParameters.get('page'));
  const list = useMoviesList({
    autoload: true,
  });

  const hasMovies = !!list.movies.length;
  const isLoading = list.status === 'pending' || list.status === 'unset';

  useEffect(() => {
    page && list.changePage(page);
  }, []);

  const handleLogout = async () => {
    await deleteToken();
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <PageContainer
      status={list.status}
      title={
        <>
          <div className="gap-4 flex items-center">
            <h2 className="font-bold md:text-5xl sm:text-3xl">
              {t('title.my_movies')}
            </h2>
            {hasMovies && (
              <Link
                className="hover:animate-pulse sm:scale-75 md:scale-100 md:mt-2"
                href="/movies/add"
              >
                <PlusButton/>
              </Link>
            )}
          </div>

          <div className="flex">
            <LanguageSwitch/>
            <span className="items-center flex">|</span>
            <Button
              onClick={handleLogout}
              className="flex align-middle justify-center items-center gap-4 pr-0"
            >
            <span className="hidden md:block">
              {t('auth.logout')}
            </span>
              <LogoutIcon/>
            </Button>
          </div>
        </>
      }
      footer={
        hasMovies && !isLoading ? (
          <Pagination
            page={list.page}
            total={list.total}
            perPage={list.limit}
            onChange={list.changePage}
          />
        ) : undefined
      }
    >
      <div className="flex flex-col flex-auto">
        {!hasMovies && (
          <div className="flex flex-col gap-8 justify-center items-center">
            <Header>
              {t('list.empty_movies')}
            </Header>
            <Link
              href="/movies/add"
            >
              <Button variant="primary">
                {t('title.add_movie')}
              </Button>
            </Link>
          </div>
        )}

        {hasMovies && (
          <div className="grid xl:gap-6 md:gap-4 gap-2 grid-cols-12">
            {/*<Input*/}
            {/*  className="col-span-12"*/}
            {/*  placeholder={t('list.search')}*/}
            {/*/>*/}
            {list.movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/edit/${movie.id}`}
                className="xl:col-span-3 md:col-span-4 col-span-6 cursor-pointer"
              >
                <MovieCard
                  title={movie.title}
                  // description={''}
                  year={+movie.year}
                  image={getPoster(movie.poster)}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ListPage;
