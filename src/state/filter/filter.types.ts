import type { Decade } from '@/api/generated/models/Decade';
import type { CultureWithRegions } from '@/api/generated/models/CultureWithRegions';
import type { LanguageWithRegions } from '@/api/generated';

export type FilterState = {
  cultures: CultureWithRegions[];
  decades: Decade[];
  languages: LanguageWithRegions[];
};

export type FilterAction =
  | { type: 'ADD_CULTURES'; payload: CultureWithRegions[] }
  | { type: 'ADD_DECADES'; payload: Decade[] }
  | { type: 'ADD_LANGUAGES'; payload: LanguageWithRegions[] };
