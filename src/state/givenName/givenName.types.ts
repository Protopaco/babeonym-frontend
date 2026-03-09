import type { GivenName } from '@/api/generated/models/GivenName';
import type { Gender } from '@/types/Gender';

export type GivenNameState = {
  givenNameCandidates: GivenName[];
  givenNameProviderLoaded: boolean;
  approvedGivenNames: GivenName[];
  selectedGenders: Gender[];
  selectedDecadeIds: number[];
};

export type GivenNameAction =
  | { type: 'GET_NEW_CANDIDATES'; payload: GivenName[] }
  | { type: 'REMOVE_CANDIDATE'; payload: number }
  | { type: 'ADD_APPROVED'; payload: GivenName[] }
  | { type: 'GIVEN_NAME_PROVIDER_LOADED' }
  | { type: 'ADD_SELECTED_GENDER'; payload: Gender }
  | { type: 'REMOVE_SELECTED_GENDER'; payload: Gender }
  | { type: 'ADD_SELECTED_DECADE_ID'; payload: number[] }
  | { type: 'REMOVE_SELECTED_DECADE_ID'; payload: number[] };
