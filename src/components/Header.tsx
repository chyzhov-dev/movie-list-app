import clsx from 'clsx';
import { PropsWithChildren, ReactElement } from 'react';

export const Header = (props: PropsWithChildren): ReactElement => {
  const {
    children,
  } = props;

  return (
    <h1 className={clsx('md:text-5xl sm:text-3xl font-bold')}>
      {children}
    </h1>
  );
};
