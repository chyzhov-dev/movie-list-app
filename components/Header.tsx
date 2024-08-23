import { PropsWithChildren } from 'react';

export const Header = (props: PropsWithChildren) => {
  return (
    <h1 className="md:text-5xl md:mb-16 sm:text-3xl sm:mb-10 sm:ml-3 md:ml-0 sm:my-8 md:my-16">
      {props.children}
    </h1>
  );
}