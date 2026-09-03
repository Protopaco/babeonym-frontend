import type { FilterState, FilterAction } from '@/state/filter/filter.types';

export const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'ADD_NAME_FILTERS':
      return { ...state, nameFilters: action.payload };
    default:
      return state;
  }
};
