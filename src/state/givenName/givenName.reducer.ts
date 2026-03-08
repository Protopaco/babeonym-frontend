import type { GivenNameState, GivenNameAction } from '@/state/givenName/givenName.types';
import type { GivenName } from '@/api/generated/models/GivenName';

export const givenNameReducer = (state: GivenNameState, action: GivenNameAction): GivenNameState => {
  switch (action.type) {
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

    case 'ADD_APPROVED': {
      return { ...state, approvedGivenNames: action.payload };
    }

    case 'GIVEN_NAME_PROVIDER_LOADED': {
      return { ...state, givenNameProviderLoaded: true };
    }

    case 'ADD_SELECTED_GENDER': {
      state.selectedGenders.push(action.payload);
      return state;
    }

    case 'REMOVE_SELECTED_GENDER': {
      const newSelectedGenders = state.selectedGenders.filter((selectedGender) => selectedGender === action.payload);
      return { ...state, selectedGenders: newSelectedGenders };
    }

    case 'ADD_SELECTED_DECADE_ID': {
      state.selectedDecadeIds.push(action.payload);
      return state;
    }

    case 'REMOVE_SELECTED_DECADE_ID': {
      const newSelectedDecadeIds = state.selectedDecadeIds.filter((selectedDecadeId) => selectedDecadeId === action.payload);
      return { ...state, selectedDecadeIds: newSelectedDecadeIds };
    }

    default:
      return state;
  }
};
