'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export const MediaProviderContext = createContext({
  isSM: false,
  isMD: false,
  isLG: false,
  isXL: false,
});

export const MediaProvider = (props: PropsWithChildren) => {
  const {
    children,
  } = props;

  const isSM = useMediaQuery('(min-width: 360px)');
  const isMD = useMediaQuery('(min-width: 768px)');
  const isLG = useMediaQuery('(min-width: 976px)');
  const isXL = useMediaQuery('(min-width: 1440px)');
  const [detect, setDetect] = useState(false);

  useEffect(() => {
    setDetect(true);
  }, []);

  return (
    <MediaProviderContext.Provider value={{ isSM, isMD, isLG, isXL }}>
      {detect && children}
    </MediaProviderContext.Provider>
  );
};
