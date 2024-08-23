import clsx from 'clsx';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  error?: string | null ;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { t } = useTranslation();
  return (
    <>
      <input
        {...props}
        ref={ref}
        className={clsx('py-3 px-4 border border-input rounded text-white bg-input', { 'border-red-800': props.error }, props.className)}
      />
      {props.error && (
        <span className='text-red-800 text-sm'> {t(props.error)} </span>
      )}
    </>
  );
});

Input.displayName = 'Input';