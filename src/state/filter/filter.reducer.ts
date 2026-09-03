import type { FilterState, FilterAction } from '@/state/filter/filter.types';

export const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'ADD_CULTURES':
      return { ...state, cultures: action.payload };
    case 'ADD_DECADES':
      return { ...state, decades: action.payload };
    case 'ADD_LANGUAGES':
      return { ...state, languages: action.payload };
    case 'ADD_NAME_FILTERS':
      return { ...state, nameFilters: action.payload };
    default:
      return state;
  }
};
