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

    // Replaces all four lists at once. The desktop surface holds its filters in
    // the URL, so what it applies is the whole selection, not a delta.
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

    case 'ADD_SELECTED_GENDER_ID': {
      return { ...state, selectedGenderIds: [...new Set([...state.selectedGenderIds, ...action.payload])] };
    }

    case 'REMOVE_SELECTED_GENDER_ID': {
      const newSelectedGenderIds = state.selectedGenderIds.filter((selectedGenderId) => !action.payload.includes(selectedGenderId));

      return { ...state, selectedGenderIds: newSelectedGenderIds };
    }

    case 'ADD_SELECTED_DECADE_ID': {
      return { ...state, selectedDecadeIds: [...new Set([...state.selectedDecadeIds, ...action.payload])] };
    }

    case 'REMOVE_SELECTED_DECADE_ID': {
      const newSelectedDecadeIds = state.selectedDecadeIds.filter((selectedDecadeId) => !action.payload.includes(selectedDecadeId));
      return { ...state, selectedDecadeIds: newSelectedDecadeIds };
    }

    case 'ADD_SELECTED_LANGUAGE_ID': {
      return { ...state, selectedLanguageIds: [...new Set([...state.selectedLanguageIds, ...action.payload])] };
    }

    case 'REMOVE_SELECTED_LANGUAGE_ID': {
      const newSelectedLanguageIds = state.selectedLanguageIds.filter((selectedLanguageId) => !action.payload.includes(selectedLanguageId));
      return { ...state, selectedLanguageIds: newSelectedLanguageIds };
    }

    case 'ADD_SELECTED_CULTURE_ID': {
      return { ...state, selectedCultureIds: [...new Set([...state.selectedCultureIds, ...action.payload])] };
    }

    case 'REMOVE_SELECTED_CULTURE_ID': {
      const newSelectedCultureIds = state.selectedCultureIds.filter((selectedCultureId) => !action.payload.includes(selectedCultureId));
      return { ...state, selectedCultureIds: newSelectedCultureIds };
    }
    default:
      return state;
  }
};
