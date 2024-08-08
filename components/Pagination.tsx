import { useMemo } from 'react';

interface PaginationProps {
  total: number;
  page: number;
  perPage: number;
}

export const Pagination = ({ total, page, perPage }: PaginationProps) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  return (
    <div className="flex justify-center items-center space-x-2">
      {hasPrev && (
        <a className="cursor-pointer" href={`?page=${page - 1}&perPage=${perPage}`}>
        Prev
      </a>
      )}
      {pages.map(( p ) => (
        <a
          href={`?page=${p}&perPage=${perPage}`}
          key={p}
          className={`hover:scale-105 transition duration-300 w-8 h-8 rounded flex justify-center items-center cursor-pointer ${p === page ? 'bg-primary text-white' : 'text-white bg-card'}`}
        >
          {p}
        </a>
      ))}
      { hasNext && (
        <a className='cursor-pointer' href={`?page=${page + 1}&perPage=${perPage}`}>
        Next
      </a>
      )}
    </div>
  );
}