'use server';
import { MovieCard } from '@/components/MovieCard';
import { PlusButton } from '@/components/PlusButton';
import { Pagination } from '@/components/Pagination';
import { getMovies } from '@/app/movies/actions/movieActions';
import { Button } from '@/components/Button';
import { LogoutIcon } from '@/components/icons/LogoutIcon';

interface Params {
  searchParams: {
    page: string
    perPage: string
  };
}

async function getData( page: number = 1, perPage: number = 4 ) {
  return getMovies(page, perPage);
}

const ListPage = async ( { searchParams }: Params ) => {

  const { page = 1, perPage = 6 } = searchParams;

  const { movies, total } = await getData(+page, +perPage);
  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-5xl flex items-center ">
          My movies
          <a className="ml-1 hover:scale-105 transition duration-300" href="movies/add">
            <PlusButton/>
          </a>
        </h2>
        <a href="/login">
          <Button className="flex  align-middle justify-center items-center gap-1">
            Logout
            <LogoutIcon/>
          </Button>
        </a>
      </div>

      <div className="min-h-[85svh] flex flex-col justify-between ">
        <div className="mt-8">
          { !movies.length && (
            <div className="flex gap-4 justify-center items-center">
              <h2 className="text-6xl">
                Your movie list is empty
              </h2>
              <Button variant="primary">Add a new movie</Button>
            </div>
          ) }
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
            {movies.map(( movie ) => {
              return (
                <a key={movie.id} href={`/movies/edit/${movie.id}`}>
                  <MovieCard
                    title={movie.name}
                    description={''}
                    year={+movie.year}
                    image={movie.image || movie.base64preview || ''}
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="my-16">
          <Pagination
            page={+page}
            total={+total}
            perPage={+perPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPage;