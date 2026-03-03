import type { FilterState, FilterAction } from '@/state/filter/filter.types';

export const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'ADD_DECADES':
      return { ...state, decades: action.payload };

    default:
      return state;
  }
};
