import { useContext } from 'react';
import { FilterContext } from '@/state/filter/filter.context';

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used inside FilterProvider');
  }
  return context;
};
