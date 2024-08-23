'use client';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { DropIcon } from '@/icons/DropIcon';

interface DragEndDropProps  {
  onDrop: (files: File) => void;
  value?: string | null;
  className?: string;
}

export const DragEndDrop = ({ onDrop, value = null, className }: DragEndDropProps) => {
  const [preview, setPreview] = useState<string | null>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

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

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
      className={clsx(' aspect-square border-2 border-dashed bg-input border-gray-300 flex justify-center items-center flex-col rounded cursor-pointer', className)}
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
        </div>
      )}
      {!preview && (
        <>
          <DropIcon/>
          <span>{t('dragAndDrop')}</span>
        </>
      )}
    </div>
  )
}