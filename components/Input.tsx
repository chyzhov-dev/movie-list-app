import clsx from 'clsx';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  error?: string | null ;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <>
      <input
        {...props}
        ref={ref}
        className={clsx('p-2 border border-input rounded text-white bg-input', { 'border-red-800': props.error }, props.className)}
      />
      {props.error && (
        <span className='text-red-800 text-sm'>{props.error}</span>
      )}
    </>
  );
});

Input.displayName = 'Input';