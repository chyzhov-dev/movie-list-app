import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  isLoading?: boolean;
}
export const Button = ({ children, className, variant, type = 'button', isLoading = false, ...props }: ButtonProps) => {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <button disabled={isLoading} type={type} {...props} className={clsx('p-3', { 'bg-primary text-white': isPrimary, 'border':  isOutline}, 'rounded', 'hover:scale-105 transition duration-300 flex justify-center', className)}>
      { isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        : children}
    </button>
  );
}