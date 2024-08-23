import type { Metadata } from 'next';
import clsx from 'clsx';
import { BottomOverlay } from '@/components/BottomOverlay';
import './globals.css';
import { Providers } from '@/app/providers';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Movie list',
  description: 'Effortlessly add and manage personalized movie lists',
};

export default function RootLayout( { children}: PropsWithChildren ) {
  return (
    <html lang="en" className="relative">
    <body className={clsx('bg-background min-h-svh h-full')}>
    <Providers>
      <div className={clsx('md:p-8 sm:p-2', 'z-50')}>
        {children}
      </div>
      <div className="absolute  bottom-0 left-0 overflow-hidden w-screen z-10 	">
        <BottomOverlay/>
        <div className="absolute  bottom-0 left-[1440px] scale-x-[-1]">
          <BottomOverlay/>
        </div>
      </div>
    </Providers>
    </body>
    </html>
  );
}
