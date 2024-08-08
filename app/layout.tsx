import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { BottomOverlay } from '@/components/BottomOverlay';
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie list",
  description: "Effortlessly add and manage personalized movie lists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
    <body className={clsx( 'bg-background min-h-svh h-full')}>
      <div className={clsx('p-8', 'z-50 mb-20')}>
        {children}
      </div>
      <div className="absolute  bottom-0 left-0 overflow-hidden w-screen z-10 	">
        <BottomOverlay/>
        <div className="absolute  bottom-0 left-[1440px] scale-x-[-1]">
          <BottomOverlay/>
        </div>
      </div>
    </body>
    </html>
  );

}
