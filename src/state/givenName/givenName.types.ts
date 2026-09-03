import type { GivenName } from '@/api/generated/models/GivenName';

export type GivenNameState = {
  givenNameCandidates: GivenName[];
  givenNameProviderLoaded: boolean;
  // Set when a fetch brings back nothing new, which means the filtered pool
  // holds no names beyond the ones already in hand. Separates an empty queue
  // that is genuinely finished from one still waiting on a request.
  candidatesExhausted: boolean;
  approvedGivenNames: GivenName[];
  selectedGenderIds: number[];
  selectedDecadeIds: number[];
  selectedLanguageIds: number[];
  selectedCultureIds: number[];
};

export type SelectedNameFilters = {
  genderIds: number[];
  decadeIds: number[];
  languageIds: number[];
  cultureIds: number[];
};

export type GivenNameAction =
  | { type: 'GET_NEW_CANDIDATES'; payload: GivenName[] }
  | { type: 'ADD_CANDIDATES'; payload: GivenName[] }
  | { type: 'REMOVE_CANDIDATE'; payload: number }
  | { type: 'RESTORE_CANDIDATE'; payload: GivenName }
  | { type: 'REMOVE_APPROVED'; payload: number }
  | { type: 'RESTORE_APPROVED'; payload: { givenName: GivenName; index: number } }
  | { type: 'ADD_APPROVED'; payload: GivenName[] }
  | { type: 'GIVEN_NAME_PROVIDER_LOADED' }
  | { type: 'SET_SELECTED_FILTERS'; payload: SelectedNameFilters }
  | { type: 'RESET_GIVEN_NAME_STATE' };
