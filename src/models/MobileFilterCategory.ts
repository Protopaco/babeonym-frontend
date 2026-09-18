import type { NameFilters } from '@/api/generated/models/NameFilters';

export type MobileFilterCategory = {
  id: string;
  buttonLabel: string;
  chipLabel: string;
  drawerTitle: string;
  optionsKey: keyof NameFilters;
  paramKey: string;
  searchable: boolean;
};
