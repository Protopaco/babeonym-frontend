import type { NameFilters } from '@/api/generated/models/NameFilters';

export type FilterState = {
  nameFilters: NameFilters;
};

export type FilterAction = { type: 'ADD_NAME_FILTERS'; payload: NameFilters };
