import type { GivenNameState, GivenNameAction } from '@/state/givenName/givenName.types';
import type { GivenName } from '@/api/generated/models/GivenName';

export const givenNameReducer = (state: GivenNameState, action: GivenNameAction): GivenNameState => {
  switch (action.type) {
    case 'GET_NEW_CANDIDATES': {
      return { ...state, givenNameCandidates: action.payload };
    }

    // Refills append rather than replace. A Map keyed by bridge id keeps the
    // first position of each entry, so existing candidates hold their order and
    // the one on screen at the front is never displaced.
    case 'ADD_CANDIDATES': {
      const existingCandidates = state.givenNameCandidates ?? [];

      const candidateMap = new Map<number, GivenName>();

      [...existingCandidates, ...action.payload].forEach((candidate) => {
        candidateMap.set(candidate.givenCustomNameBridgeId, candidate);
      });

      return {
        ...state,
        givenNameCandidates: Array.from(candidateMap.values()),
      };
    }

    case 'REMOVE_CANDIDATE': {
      let filteredCandidates: GivenName[] = [];
      if (state.givenNameCandidates.length > 0) {
        filteredCandidates = state.givenNameCandidates.filter(({ givenCustomNameBridgeId }) => givenCustomNameBridgeId !== action.payload);
      }

      return { ...state, givenNameCandidates: filteredCandidates };
    }

    // Only the first candidate is ever shown, so a removed one always belongs
    // back at the front.
    case 'RESTORE_CANDIDATE': {
      return { ...state, givenNameCandidates: [action.payload, ...state.givenNameCandidates] };
    }

    case 'ADD_APPROVED': {
      return { ...state, approvedGivenNames: action.payload };
    }

    case 'REMOVE_APPROVED': {
      const approvedGivenNames = state.approvedGivenNames.filter(
        ({ givenCustomNameBridgeId }) => givenCustomNameBridgeId !== action.payload
      );

      return { ...state, approvedGivenNames };
    }

    case 'RESTORE_APPROVED': {
      const { givenName, index } = action.payload;
      const approvedGivenNames = [...state.approvedGivenNames];
      approvedGivenNames.splice(index, 0, givenName);

      return { ...state, approvedGivenNames };
    }

    case 'GIVEN_NAME_PROVIDER_LOADED': {
      return { ...state, givenNameProviderLoaded: true };
    }

    // Replaces all four lists at once. Both surfaces hold their filters in the
    // URL, so what they apply is the whole selection, not a delta.
    case 'SET_SELECTED_FILTERS': {
      const { genderIds, decadeIds, languageIds, cultureIds } = action.payload;

      return {
        ...state,
        selectedGenderIds: genderIds,
        selectedDecadeIds: decadeIds,
        selectedLanguageIds: languageIds,
        selectedCultureIds: cultureIds,
      };
    }

    default:
      return state;
  }
};
