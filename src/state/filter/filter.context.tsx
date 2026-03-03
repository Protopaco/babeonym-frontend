import { createContext, useContext } from 'react';
import type { FilterState, FilterAction } from '@/state/filter/filter.types';

export const FilterContext = createContext<
  | {
      state: FilterState;
      dispatch: React.Dispatch<FilterAction>;
    }
  | undefined
>(undefined);

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used inside FilterProvider');
  }
  return context;
};
