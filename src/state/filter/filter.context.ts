import { createContext } from 'react';
import type { FilterState, FilterAction } from '@/state/filter/filter.types';

export const FilterContext = createContext<
  | {
      state: FilterState;
      dispatch: React.Dispatch<FilterAction>;
    }
  | undefined
>(undefined);
