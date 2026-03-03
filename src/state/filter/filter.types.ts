import type { Decade } from '@/api/generated/models/Decade';
import type { Language } from '@/api/generated/models/Language';
import type { Culture } from '@/api/generated/models/Culture';

export type FilterState = {
  cultures: Culture[];
  decades: Decade[];
  languages: Language[];
};

export type FilterAction =
  | { type: 'ADD_CULTURES'; payload: Culture[] }
  | { type: 'ADD_DECADES'; payload: Decade[] }
  | { type: 'ADD_LANGUAGES'; payload: Language[] };
