'use client';
import { SimpleContainerProps } from '@/types/components';
import { PropsWithChildren, ReactElement } from 'react';

export const SimpleContainer = (props: PropsWithChildren<SimpleContainerProps>): ReactElement => {
  const {
    title,
    children,
  } = props;

  return (
    <div className="grid grid-cols-12 md:gap-6 gap-2 self-center">
      <div className="max-h-fit md:col-start-5 md:col-span-4 col-span-12">
        {title && (
          <h1 className="text-7xl text-center my-14 font-bold">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
};
