import { CardProps } from '@/types/components';
import Image from 'next/image';
import { ReactElement } from 'react';

export const MovieCard = (props: CardProps): ReactElement => {
  const {
    title,
    // description,
    year,
    image,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      className="flex flex-col p-2 bg-card rounded-lg2 hover:shadow-lg transform transition-all duration-500 hover:bg-input aspect-auto"
    >
      <div className="xl:min-h-100 md:min-h-72 min-h-56 relative">
        <Image
          fill
          priority
          src={image}
          alt={title}
          className="object-cover rounded-lg2 aspect-[9/16]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="pl-2 text-left my-4 flex flex-col gap-2">
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-sm text-white mt-2">{year}</p>
      </div>
    </div>
  );
};
