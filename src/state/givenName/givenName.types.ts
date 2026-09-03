import type { GivenName } from '@/api/generated/models/GivenName';

export type GivenNameState = {
  givenNameCandidates: GivenName[];
  givenNameProviderLoaded: boolean;
  approvedGivenNames: GivenName[];
  selectedGenderIds: number[];
  selectedDecadeIds: number[];
  selectedLanguageIds: number[];
  selectedCultureIds: number[];
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
  | { type: 'ADD_SELECTED_GENDER_ID'; payload: number[] }
  | { type: 'REMOVE_SELECTED_GENDER_ID'; payload: number[] }
  | { type: 'ADD_SELECTED_DECADE_ID'; payload: number[] }
  | { type: 'REMOVE_SELECTED_DECADE_ID'; payload: number[] }
  | { type: 'ADD_SELECTED_LANGUAGE_ID'; payload: number[] }
  | { type: 'REMOVE_SELECTED_LANGUAGE_ID'; payload: number[] }
  | { type: 'ADD_SELECTED_CULTURE_ID'; payload: number[] }
  | { type: 'REMOVE_SELECTED_CULTURE_ID'; payload: number[] };
