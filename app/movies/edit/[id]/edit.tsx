'use client';
import { CreateEditMovie, MoviePayload } from '@/components/CreateEditMovie';
import { editMovie } from '@/app/movies/actions/movieActions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EditMovieProps {
  data: MoviePayload
  id: number
}

export const EditMovie = ({data, id}: EditMovieProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async(data: MoviePayload ) => {
      try {
        setIsLoading(true)
        await editMovie(id, data.name, +data.year, data.base64preview || '');
         router.push('/movies');
      } catch (e) {
        console.log(e);
        alert('An error occurred');
      }
  }

    return (
      <CreateEditMovie onSubmit={onSubmit} data={data} isLoading={isLoading} />
    )
}