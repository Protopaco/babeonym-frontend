import type { Decade } from '@/api/generated/models/Decade';
import type { Language } from '@/api/generated/models/Language';
import type { Culture } from '@/api/generated/models/Culture';
import type { LanguageWithRegions } from '@/api/generated';

export type FilterState = {
  cultures: Culture[];
  decades: Decade[];
  languages: LanguageWithRegions[];
};

export type FilterAction =
  | { type: 'ADD_CULTURES'; payload: Culture[] }
  | { type: 'ADD_DECADES'; payload: Decade[] }
  | { type: 'ADD_LANGUAGES'; payload: Language[] };
