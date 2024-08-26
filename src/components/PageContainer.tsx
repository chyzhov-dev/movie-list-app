'use client';
import { Spinner } from '@/components/Spinner';
import { ContentProps } from '@/types/components';
import { Status } from '@/types/store';
import clsx from 'clsx';
import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';

export const PageContainer = (props: PropsWithChildren<ContentProps>): ReactElement => {
  const {
    children,
    title,
    footer,
    className,
    status,
  } = props;

  const [render, setRender] = useState(false);
  const isLoading = status === Status.pending || status === Status.unset;

  useEffect(() => {
    if (isLoading) {
      setRender(true);
    }

    if (!isLoading) {
      setTimeout(() => setRender(false), 400);
    }
  }, [isLoading]);

  return (
    <div className="h-full flex flex-col md:pt-0 pt-8 pb-8">
      {title && (
        <div className="flex items-center justify-between xl:mb-30 md:mb-20 mb-10">
          {title}
        </div>
      )}

      <div
        className={clsx(
          'flex flex-col relative',
          className,
        )}
      >
        {render && (
          <div className="flex flex-col items-center absolute inset-0 z-50">
            <Spinner/>
          </div>
        )}

        <div className={clsx(
          'flex flex-col flex-auto relative transition-all duration-75',
          {
            'blur-md': render,
          }
        )}>

          {children}
        </div>
      </div>

      {footer && (
        <div className="my-16">
          {footer}
        </div>
      )}
    </div>
  );
};
