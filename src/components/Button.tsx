import { ButtonProps } from '@/types/components';
import clsx from 'clsx';
import { ReactElement } from 'react';

export const Button = (props: ButtonProps): ReactElement => {
  const {
    children,
    className,
    variant,
    type = 'button',
    isLoading = false,
    ...rest
  } = props;

  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';

  return (
    <button
      disabled={isLoading}
      type={type}
      {...rest}
      className={clsx(
        'px-6 py-4',
        {
          'bg-primary text-white': isPrimary,
          'bg-error text-white': isDanger,
          'border': isOutline
        },
        'rounded-lg2',
        'hover:animate-pulse flex justify-center font-bold',
        className
      )}>
      {isLoading
        ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        : children
      }
    </button>
  );
};
