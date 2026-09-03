import type { Decade } from '@/api/generated/models/Decade';
import type { CultureWithRegions } from '@/api/generated/models/CultureWithRegions';
import type { LanguageWithRegions } from '@/api/generated';
import type { NameFilters } from '@/api/generated/models/NameFilters';

export type FilterState = {
  cultures: CultureWithRegions[];
  decades: Decade[];
  languages: LanguageWithRegions[];
  nameFilters: NameFilters;
};

export type FilterAction =
  | { type: 'ADD_CULTURES'; payload: CultureWithRegions[] }
  | { type: 'ADD_DECADES'; payload: Decade[] }
  | { type: 'ADD_LANGUAGES'; payload: LanguageWithRegions[] }
  | { type: 'ADD_NAME_FILTERS'; payload: NameFilters };
