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

// The four categories differ only in their labels, their param, and which list
// they read, so they are data rather than four near-identical components.
export const mobileFilterCategories: MobileFilterCategory[] = [
  {
    id: 'gender',
    buttonLabel: 'Gender',
    chipLabel: 'Gender',
    drawerTitle: 'Gender',
    optionsKey: 'genderOptions',
    paramKey: 'genders',
    searchable: false,
  },
  {
    id: 'decade',
    buttonLabel: 'Decade',
    chipLabel: 'Decade',
    drawerTitle: 'Decades',
    optionsKey: 'decadeOptions',
    paramKey: 'decades',
    searchable: true,
  },
  {
    id: 'culture',
    buttonLabel: 'Culture',
    chipLabel: 'Culture',
    drawerTitle: 'Cultures',
    optionsKey: 'cultureOptions',
    paramKey: 'cultures',
    searchable: true,
  },
  {
    id: 'language',
    buttonLabel: 'Language',
    chipLabel: 'Language',
    drawerTitle: 'Languages',
    optionsKey: 'languageOptions',
    paramKey: 'languages',
    searchable: true,
  },
];
