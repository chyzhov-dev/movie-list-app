import { InputProps } from '@/types/components';
import clsx from 'clsx';
import { forwardRef, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref): ReactElement => {
  const {
    error,
    className,
    ...rest
  } = props;

  const { t } = useTranslation();

  return (
    <>
      <input
        {...rest}
        ref={ref}
        className={clsx(
          // eslint-disable-next-line max-len
          'py-3 px-4 border rounded-lg2 text-white bg-input placeholder:text-slate-100 focus:outline-none focus:ring',
          {
            'border-input focus:ring-primary': !error,
            'border-red-500 focus:ring-error': error
          },
          className
        )}
      />
      {error && (
        <span className="text-red-500 text-sm"> {t(error)} </span>
      )}
    </>
  );
});

Input.displayName = 'Input';
