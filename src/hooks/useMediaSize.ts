import { MediaProviderContext } from '@/providers/MediaProvider';
import { useContext } from 'react';

export const useDeviceSizes = () => ({
  ...useContext(MediaProviderContext),
});
