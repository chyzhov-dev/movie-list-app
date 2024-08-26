import { BottomOverlay } from '@/components/BottomOverlay';
import { LangProvider } from '@/providers/LangProvider';
import { MediaProvider } from '@/providers/MediaProvider';
import type { Metadata } from 'next';
import { PropsWithChildren, ReactElement } from 'react';
import '@/globals.css';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Movie list',
  description: 'Effortlessly add and manage personalized movie lists',
};

export default function RootLayout(props: PropsWithChildren): ReactElement {
  const {
    children
  } = props;

  return (
    <html lang="en" className="relative">
    <body className="bg-background min-h-svh h-full w-full flex justify-center">
    <LangProvider>
      <MediaProvider>
        <div className="max-w-screen-xl w-full flex">
          <div className="md:m-30 m-4 z-50 flex-auto grid">
            {children}
          </div>
          <div className="absolute bottom-0 left-0 overflow-hidden w-full z-10">
            <BottomOverlay/>
          </div>
        </div>
        <ToastContainer
          pauseOnHover
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          theme="colored"
        />
      </MediaProvider>
    </LangProvider>
    </body>
    </html>
  );
}
