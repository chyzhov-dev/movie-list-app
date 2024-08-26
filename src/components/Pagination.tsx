import { PaginationProps } from '@/types/components';
import clsx from 'clsx';
import Link from 'next/link';
import { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const Pagination = (props: PaginationProps): ReactElement => {
  const {
    total,
    page,
    perPage,
    onChange,
  } = props;

  const { t } = useTranslation();
  const totalPages = Math.ceil(total / perPage);
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const handleChange = (value: number) => {
    onChange && onChange(value);
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      {hasPrev && (
        <Link
          className="cursor-pointer font-bold hover:animate-pulse"
          href={`?page=${page - 1}`}
          onClick={() => handleChange(page - 1)}
        >
          {t('pagination.prev')}
        </Link>
      )}
      <div className="flex justify-center items-center space-x-2">
        {pages.map((p) => (
          <Link
            key={p}
            className={clsx(
              'font-bold hover:animate-pulse w-8 h-8 rounded flex justify-center items-center',
              {
                'bg-primary text-white pointer-events-none': p === page,
                'text-white bg-card cursor-pointer': p !== page,
              }
            )}
            href={p === 1 ? '?' : `?page=${p}`}
            onClick={() => handleChange(p)}
          >
            {p}
          </Link>
        ))}
      </div>
      {hasNext && (
        <Link
          className="cursor-pointer font-bold hover:animate-pulse"
          href={`?page=${page + 1}`}
          onClick={() => handleChange(page + 1)}
        >
          {t('pagination.next')}
        </Link>
      )}
    </div>
  );
};
