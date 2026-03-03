import type { GivenName } from '@/api/generated/models/GivenName';

export type GivenNameState = {
  givenNameCandidates: GivenName[];
  givenNameProviderLoaded: boolean;
};

export type GivenNameAction =
  | { type: 'ADD_CANDIDATES'; payload: GivenName[] }
  | { type: 'REMOVE_CANDIDATE'; payload: number }
  | { type: 'GIVEN_NAME_PROVIDER_LOADED' };
