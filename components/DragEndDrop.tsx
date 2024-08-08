'use client';
import { useRef, useState } from 'react';
import { Button } from '@/components/Button';
import clsx from 'clsx';
interface DragEndDropProps  {
  onDrop: (files: File) => void;
  value?: string;
  className?: string;
}

export const DragEndDrop: React.FC<DragEndDropProps> = ({ onDrop, value = null, className }) => {
  const [preview, setPreview] = useState<string | null>(value);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const createPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>  ) => {
    try {
      e.preventDefault();
      const file = e.dataTransfer.files[0]
      createPreview(file)
      onDrop(file);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = e.target;
      const file= files?.[0];
      if (!file) {
      return
    }
      createPreview(file);
      onDrop(file);
    } catch (e) {
      console.error(e)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clear = (e: React.MouseEvent<HTMLDivElement> ) => {
    setPreview(null);
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
      className={clsx(' aspect-square border-2 border-dashed border-gray-300 flex justify-center items-center flex-col rounded cursor-pointer', className)}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleClick}
      />
      {preview && (
        <div className='relative overflow-hidden'>
          <img src={preview} alt="preview" className="object-cover"/>
          <div className='absolute top-2 right-2' onClick={clear}>
            <Button
              variant='outline'
              className='bg-input rounded-full w-12 h-12 opacity-50 hover:opacity-100 transition duration-300'
            >
              X
            </Button>
          </div>
        </div>
      )}
      {!preview && (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3_407)">
              <path
                d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_3_407">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Drop your files here</span>
        </>
      )}
    </div>
  )
}