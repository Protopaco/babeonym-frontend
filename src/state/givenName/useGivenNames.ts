import { useContext } from 'react';
import { GivenNameContext } from '@/state/givenName/givenName.context';

export const useGivenNames = () => {
  const context = useContext(GivenNameContext);
  if (!context) {
    throw new Error('useGivenNames must be used inside GivenNamesProvider');
  }
  return context;
};
