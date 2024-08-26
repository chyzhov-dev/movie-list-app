'use client';
import { DropIcon } from '@/icons/DropIcon';
import { DragEndDropProps } from '@/types/components';
import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent, DragEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const DragEndDrop = (props: DragEndDropProps): ReactElement => {
  const {
    value = null,
    className,
    onDrop,
  } = props;

  const [preview, setPreview] = useState<string | null>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const createPreview = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      createPreview(file);
      onDrop(file);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = e.target;
      const file = files?.[0];

      if (!file) {
        return;
      }

      createPreview(file);
      onDrop(file);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
      className={clsx(
        // eslint-disable-next-line max-len
        'aspect-square border-2 border-dashed bg-input border-gray-300 flex justify-center items-center flex-col rounded-lg2 cursor-pointer',
        className
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleClick}
      />
      {preview && (
        <div className="w-full h-full relative overflow-hidden">
          <Image
            fill
            priority
            src={preview}
            alt="preview"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {!preview && (
        <>
          <DropIcon/>
          <span>{t('form.dragAndDrop')}</span>
        </>
      )}
    </div>
  );
};
