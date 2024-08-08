'use client';

import { CreateEditMovie, MoviePayload } from '@/components/CreateEditMovie';
import { addMovie } from '@/app/movies/actions/movieActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreatePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async(data: MoviePayload ) => {
    try {
      setIsLoading(true)
      await addMovie(data.name, +data.year, data.base64preview || '');
      router.push('/movies');
    } catch (error) {
      console.log(error);
      alert('An error occurred');
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="container mx-auto lg:p-20">
      <h1 className="text-5xl">Create a new movie </h1>
      <CreateEditMovie onSubmit={onSubmit} isLoading={isLoading}/>
    </div>
  );
}

export default CreatePage;