import { createContext } from 'react';
import type { FilterState } from '@/models/FilterState';
import type { FilterAction } from '@/models/FilterAction';

export const FilterContext = createContext<
  | {
      state: FilterState;
      dispatch: React.Dispatch<FilterAction>;
    }
  | undefined
>(undefined);
