import { describe, expect, it } from 'vitest';
import type { GivenName } from '@/api/generated/models/GivenName';
import type { GivenNameAction } from '@/models/GivenNameAction';
import type { GivenNameState } from '@/models/GivenNameState';
import { givenNameReducer } from '@/state/givenName/givenName.reducer';
import { initialGivenNameState } from '@/state/givenName/givenName.initialState';

const buildGivenName = (givenCustomNameBridgeId: number, overrides: Partial<GivenName> = {}): GivenName => ({
  givenName: `Name ${givenCustomNameBridgeId}`,
  givenCustomNameBridgeId,
  rating: 0,
  ...overrides,
});

const buildState = (overrides: Partial<GivenNameState> = {}): GivenNameState => ({
  ...initialGivenNameState,
  ...overrides,
});

const bridgeIdsOf = (givenNames: GivenName[]): number[] => givenNames.map(({ givenCustomNameBridgeId }) => givenCustomNameBridgeId);

describe('givenNameReducer', () => {
  describe('GET_NEW_CANDIDATES', () => {
    it('replaces the existing candidates with the payload', () => {
      const state = buildState({ givenNameCandidates: [buildGivenName(1), buildGivenName(2)] });

      const result = givenNameReducer(state, { type: 'GET_NEW_CANDIDATES', payload: [buildGivenName(3)] });

      expect(bridgeIdsOf(result.givenNameCandidates)).toEqual([3]);
    });

    it('marks the candidates exhausted when the payload is empty', () => {
      const result = givenNameReducer(buildState(), { type: 'GET_NEW_CANDIDATES', payload: [] });

      expect(result.candidatesExhausted).toBe(true);
    });

    it('clears the exhausted flag when the payload has candidates', () => {
      const state = buildState({ candidatesExhausted: true });

      const result = givenNameReducer(state, { type: 'GET_NEW_CANDIDATES', payload: [buildGivenName(1)] });

      expect(result.candidatesExhausted).toBe(false);
    });

    it('clears the candidate error message', () => {
      const state = buildState({ candidateErrorMessage: 'Something went wrong' });

      const result = givenNameReducer(state, { type: 'GET_NEW_CANDIDATES', payload: [buildGivenName(1)] });

      expect(result.candidateErrorMessage).toBeNull();
    });
  });

  describe('ADD_CANDIDATES', () => {
    it('appends new candidates after the existing ones, keeping the existing order', () => {
      const state = buildState({ givenNameCandidates: [buildGivenName(5), buildGivenName(2)] });

      const result = givenNameReducer(state, { type: 'ADD_CANDIDATES', payload: [buildGivenName(9), buildGivenName(1)] });

      expect(bridgeIdsOf(result.givenNameCandidates)).toEqual([5, 2, 9, 1]);
    });

    it('does not duplicate a candidate that is already held', () => {
      const state = buildState({ givenNameCandidates: [buildGivenName(1), buildGivenName(2)] });

      const result = givenNameReducer(state, { type: 'ADD_CANDIDATES', payload: [buildGivenName(2), buildGivenName(3)] });

      expect(bridgeIdsOf(result.givenNameCandidates)).toEqual([1, 2, 3]);
    });

    it('is not exhausted when the merge adds something', () => {
      const state = buildState({ givenNameCandidates: [buildGivenName(1)], candidatesExhausted: true });

      const result = givenNameReducer(state, { type: 'ADD_CANDIDATES', payload: [buildGivenName(2)] });

      expect(result.candidatesExhausted).toBe(false);
    });

    it('is exhausted when the payload is empty', () => {
      const state = buildState({ givenNameCandidates: [buildGivenName(1)] });

      const result = givenNameReducer(state, { type: 'ADD_CANDIDATES', payload: [] });

      expect(result.candidatesExhausted).toBe(true);
    });

    it('is exhausted when the merge adds nothing, even though the payload was not empty', () => {
      const state = buildState({ givenNameCandidates: [buildGivenName(1), buildGivenName(2)] });

      const result = givenNameReducer(state, { type: 'ADD_CANDIDATES', payload: [buildGivenName(2), buildGivenName(1)] });

      expect(result.candidatesExhausted).toBe(true);
      expect(bridgeIdsOf(result.givenNameCandidates)).toEqual([1, 2]);
    });

    it('clears the candidate error message', () => {
      const state = buildState({ candidateErrorMessage: 'Something went wrong' });

      const result = givenNameReducer(state, { type: 'ADD_CANDIDATES', payload: [buildGivenName(1)] });

      expect(result.candidateErrorMessage).toBeNull();
    });
  });

  describe('REMOVE_CANDIDATE', () => {
    it('removes the candidate with the given bridge id', () => {
      const state = buildState({ givenNameCandidates: [buildGivenName(1), buildGivenName(2), buildGivenName(3)] });

      const result = givenNameReducer(state, { type: 'REMOVE_CANDIDATE', payload: 2 });

      expect(bridgeIdsOf(result.givenNameCandidates)).toEqual([1, 3]);
    });

    it('changes nothing when the bridge id is unknown', () => {
      const state = buildState({ givenNameCandidates: [buildGivenName(1), buildGivenName(2)] });

      const result = givenNameReducer(state, { type: 'REMOVE_CANDIDATE', payload: 99 });

      expect(result.givenNameCandidates).toEqual(state.givenNameCandidates);
    });

    it('keeps an empty list empty', () => {
      const result = givenNameReducer(buildState(), { type: 'REMOVE_CANDIDATE', payload: 1 });

      expect(result.givenNameCandidates).toEqual([]);
    });
  });

  describe('RESTORE_CANDIDATE', () => {
    it('puts the candidate at the front', () => {
      const state = buildState({ givenNameCandidates: [buildGivenName(1), buildGivenName(2)] });

      const result = givenNameReducer(state, { type: 'RESTORE_CANDIDATE', payload: buildGivenName(7) });

      expect(bridgeIdsOf(result.givenNameCandidates)).toEqual([7, 1, 2]);
    });
  });

  describe('ADD_APPROVED', () => {
    it('keeps the object already held when a name comes back identical', () => {
      const heldGivenName = buildGivenName(1, { rating: 3, gender: 'FEMALE', etymology: null });
      const state = buildState({ approvedGivenNames: [heldGivenName] });
      const identicalGivenName = { ...heldGivenName };

      const result = givenNameReducer(state, { type: 'ADD_APPROVED', payload: [identicalGivenName] });

      expect(result.approvedGivenNames[0]).toBe(heldGivenName);
    });

    it('takes the new object when a name has changed', () => {
      const heldGivenName = buildGivenName(1, { rating: 3 });
      const state = buildState({ approvedGivenNames: [heldGivenName] });
      const changedGivenName = buildGivenName(1, { rating: 5 });

      const result = givenNameReducer(state, { type: 'ADD_APPROVED', payload: [changedGivenName] });

      expect(result.approvedGivenNames[0]).toBe(changedGivenName);
    });

    it('takes the new object for a name that was not held', () => {
      const newGivenName = buildGivenName(2);

      const result = givenNameReducer(buildState(), { type: 'ADD_APPROVED', payload: [newGivenName] });

      expect(result.approvedGivenNames).toEqual([newGivenName]);
      expect(result.approvedGivenNames[0]).toBe(newGivenName);
    });
  });

  describe('REORDER_APPROVED', () => {
    it('makes the approved list the payload, in its order', () => {
      const state = buildState({ approvedGivenNames: [buildGivenName(1), buildGivenName(2), buildGivenName(3)] });
      const reorderedGivenNames = [buildGivenName(3), buildGivenName(1), buildGivenName(2)];

      const result = givenNameReducer(state, { type: 'REORDER_APPROVED', payload: reorderedGivenNames });

      expect(bridgeIdsOf(result.approvedGivenNames)).toEqual([3, 1, 2]);
    });
  });

  describe('REMOVE_APPROVED', () => {
    it('removes the approved name with the given bridge id', () => {
      const state = buildState({ approvedGivenNames: [buildGivenName(1), buildGivenName(2), buildGivenName(3)] });

      const result = givenNameReducer(state, { type: 'REMOVE_APPROVED', payload: 1 });

      expect(bridgeIdsOf(result.approvedGivenNames)).toEqual([2, 3]);
    });

    it('changes nothing when the bridge id is unknown', () => {
      const state = buildState({ approvedGivenNames: [buildGivenName(1), buildGivenName(2)] });

      const result = givenNameReducer(state, { type: 'REMOVE_APPROVED', payload: 99 });

      expect(result.approvedGivenNames).toEqual(state.approvedGivenNames);
    });
  });

  describe('RESTORE_APPROVED', () => {
    const approvedGivenNames = [buildGivenName(1), buildGivenName(2), buildGivenName(3)];

    it('inserts at the start when the index is 0', () => {
      const result = givenNameReducer(buildState({ approvedGivenNames }), {
        type: 'RESTORE_APPROVED',
        payload: { givenName: buildGivenName(9), index: 0 },
      });

      expect(bridgeIdsOf(result.approvedGivenNames)).toEqual([9, 1, 2, 3]);
    });

    it('inserts in the middle at the given index', () => {
      const result = givenNameReducer(buildState({ approvedGivenNames }), {
        type: 'RESTORE_APPROVED',
        payload: { givenName: buildGivenName(9), index: 1 },
      });

      expect(bridgeIdsOf(result.approvedGivenNames)).toEqual([1, 9, 2, 3]);
    });

    it('inserts at the end when the index equals the list length', () => {
      const result = givenNameReducer(buildState({ approvedGivenNames }), {
        type: 'RESTORE_APPROVED',
        payload: { givenName: buildGivenName(9), index: approvedGivenNames.length },
      });

      expect(bridgeIdsOf(result.approvedGivenNames)).toEqual([1, 2, 3, 9]);
    });
  });

  describe('GIVEN_NAME_PROVIDER_LOADED', () => {
    it('sets givenNameProviderLoaded', () => {
      const result = givenNameReducer(buildState(), { type: 'GIVEN_NAME_PROVIDER_LOADED' });

      expect(result.givenNameProviderLoaded).toBe(true);
    });
  });

  describe('CANDIDATE_FETCH_FAILED', () => {
    it('stores the message', () => {
      const result = givenNameReducer(buildState(), { type: 'CANDIDATE_FETCH_FAILED', payload: 'Could not load names' });

      expect(result.candidateErrorMessage).toBe('Could not load names');
    });
  });

  describe('SET_SELECTED_FILTERS', () => {
    it('replaces all four id lists at once', () => {
      const state = buildState({
        selectedGenderIds: [1],
        selectedDecadeIds: [2],
        selectedLanguageIds: [3],
        selectedCultureIds: [4],
      });

      const result = givenNameReducer(state, {
        type: 'SET_SELECTED_FILTERS',
        payload: { genderIds: [10, 11], decadeIds: [20], languageIds: [], cultureIds: [40, 41, 42] },
      });

      expect(result.selectedGenderIds).toEqual([10, 11]);
      expect(result.selectedDecadeIds).toEqual([20]);
      expect(result.selectedLanguageIds).toEqual([]);
      expect(result.selectedCultureIds).toEqual([40, 41, 42]);
    });
  });

  describe('RESET_GIVEN_NAME_STATE', () => {
    it('returns the initial state, including givenNameProviderLoaded back to false', () => {
      const state = buildState({
        givenNameCandidates: [buildGivenName(1)],
        approvedGivenNames: [buildGivenName(2)],
        givenNameProviderLoaded: true,
        candidatesExhausted: true,
        candidateErrorMessage: 'Something went wrong',
        selectedGenderIds: [1],
      });

      const result = givenNameReducer(state, { type: 'RESET_GIVEN_NAME_STATE' });

      expect(result).toEqual(initialGivenNameState);
      expect(result.givenNameProviderLoaded).toBe(false);
    });
  });

  describe('unknown action', () => {
    it('returns the same state object', () => {
      const state = buildState();
      const unknownAction = { type: 'NOT_A_REAL_ACTION' } as unknown as GivenNameAction;

      expect(givenNameReducer(state, unknownAction)).toBe(state);
    });
  });

  describe('immutability', () => {
    const buildActions = (): GivenNameAction[] => [
      { type: 'GET_NEW_CANDIDATES', payload: [buildGivenName(10)] },
      { type: 'ADD_CANDIDATES', payload: [buildGivenName(10)] },
      { type: 'REMOVE_CANDIDATE', payload: 1 },
      { type: 'RESTORE_CANDIDATE', payload: buildGivenName(10) },
      { type: 'ADD_APPROVED', payload: [buildGivenName(1), buildGivenName(10)] },
      { type: 'REORDER_APPROVED', payload: [buildGivenName(2), buildGivenName(1)] },
      { type: 'REMOVE_APPROVED', payload: 1 },
      { type: 'RESTORE_APPROVED', payload: { givenName: buildGivenName(10), index: 1 } },
      { type: 'GIVEN_NAME_PROVIDER_LOADED' },
      { type: 'CANDIDATE_FETCH_FAILED', payload: 'Failed' },
      { type: 'SET_SELECTED_FILTERS', payload: { genderIds: [9], decadeIds: [9], languageIds: [9], cultureIds: [9] } },
      { type: 'RESET_GIVEN_NAME_STATE' },
    ];

    const buildPopulatedState = (): GivenNameState =>
      buildState({
        givenNameCandidates: [buildGivenName(1), buildGivenName(2)],
        approvedGivenNames: [buildGivenName(1), buildGivenName(2)],
        selectedGenderIds: [1],
        selectedDecadeIds: [2],
        selectedLanguageIds: [3],
        selectedCultureIds: [4],
      });

    it.each(buildActions().map((action) => [action.type, action] as const))('%s does not mutate the state it was given', (_actionType, action) => {
      const state = buildPopulatedState();
      const snapshotBeforeAction = structuredClone(state);

      givenNameReducer(state, action);

      expect(state).toEqual(snapshotBeforeAction);
    });
  });
});
