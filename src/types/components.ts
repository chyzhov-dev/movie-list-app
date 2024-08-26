import { Status } from '@/types/store';
import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactElement, ReactNode } from 'react';

export interface MovieFormProps {
  onSubmit: (data: MoviePayload) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  isLoading?: boolean;
  data?: MoviePayload;
  error?: string;
  mode?: 'create' | 'edit';
}

export type MoviePayload = {
  title: string;
  year: number;
  base64preview?: string;
  file?: File | null;
  poster?: string;
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'danger';
  className?: string;
  isLoading?: boolean;
}

export interface CheckboxProps {
  label: string;
  className?: string;
}

export interface DragEndDropProps {
  onDrop: (files: File) => void;
  value?: string | null;
  className?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  error?: string | null;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  // description?: string;
  year: number;
  image: string;
}

export interface ContentProps {
  title?: ReactElement;
  footer?: ReactElement;
  className?: string;
  status?: Status;
}

export interface PaginationProps {
  total: number;
  page: number;
  perPage: number;
  onChange?: (page: number) => void;
}

export interface SimpleContainerProps {
  title?: ReactElement | string;
}
