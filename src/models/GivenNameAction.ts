import type { GivenName } from '@/api/generated/models/GivenName';
import type { SelectedNameFilters } from '@/models/SelectedNameFilters';

export type GivenNameAction =
  | { type: 'GET_NEW_CANDIDATES'; payload: GivenName[] }
  | { type: 'ADD_CANDIDATES'; payload: GivenName[] }
  | { type: 'REMOVE_CANDIDATE'; payload: number }
  | { type: 'RESTORE_CANDIDATE'; payload: GivenName }
  | { type: 'REMOVE_APPROVED'; payload: number }
  | { type: 'RESTORE_APPROVED'; payload: { givenName: GivenName; index: number } }
  | { type: 'ADD_APPROVED'; payload: GivenName[] }
  | { type: 'REORDER_APPROVED'; payload: GivenName[] }
  | { type: 'GIVEN_NAME_PROVIDER_LOADED' }
  | { type: 'CANDIDATE_FETCH_FAILED'; payload: string }
  | { type: 'SET_SELECTED_FILTERS'; payload: SelectedNameFilters }
  | { type: 'RESET_GIVEN_NAME_STATE' };
