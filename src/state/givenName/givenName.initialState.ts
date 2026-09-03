import type { GivenNameState } from '@/state/givenName/givenName.types';

// Kept out of the provider so the reducer can reset to it without importing
// back. Anything added here is cleared on a session reset by construction,
// rather than by remembering to list it.
export const initialGivenNameState: GivenNameState = {
  givenNameCandidates: [],
  approvedGivenNames: [],
  givenNameProviderLoaded: false,
  candidatesExhausted: false,
  selectedGenderIds: [],
  selectedDecadeIds: [],
  selectedLanguageIds: [],
  selectedCultureIds: [],
};
