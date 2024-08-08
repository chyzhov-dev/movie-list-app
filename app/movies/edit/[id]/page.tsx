import { findMovie } from '@/app/movies/actions/movieActions';
import { EditMovie } from '@/app/movies/edit/[id]/edit';

interface Params {
  params: {
    id: string
  }
}

const getData = async (id: number) => {
  return findMovie(id)
}

export default async function EditPage({ params }: Params) {
  const data= await getData(+params.id);
  return (
    <div className="container mx-auto lg:p-20">
      <h1 className="text-5xl">Edit </h1>
      <EditMovie
        id={+params.id}
        data={{
        name: data.name,
        year: data.year,
        base64preview: data.base64preview || ''
      }}
      />
    </div>
  )}