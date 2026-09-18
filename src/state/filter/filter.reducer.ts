import type { FilterState } from '@/models/FilterState';
import type { FilterAction } from '@/models/FilterAction';

export const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'ADD_NAME_FILTERS':
      return { ...state, nameFilters: action.payload };
    default:
      return state;
  }
};
