import { useContext, useReducer, useEffect, useMemo, useRef } from 'react';
import { givenNameApi } from '@/api/client';
import type { ReactNode } from 'react';
import { ApiV1GivenNameActionPostRequestNewStateEnum } from '@/api/generated/models/ApiV1GivenNameActionPostRequest';
import type { V1GivenNameActionOperationRequest, V1GivenNameCandidatesRequest } from '@/api/generated/apis/GivenNameApi';
import { GivenNameContext } from '@/state/givenName/givenName.context';
import type { GivenNameState } from '@/state/givenName/givenName.types';
import { givenNameReducer } from '@/state/givenName/givenName.reducer';
import type { Gender } from '@/types/Gender';

const initialState: GivenNameState = {
  givenNameCandidates: [],
  approvedGivenNames: [],
  givenNameProviderLoaded: false,
  selectedGenders: [],
  selectedDecadeIds: [],
};

export const GivenNameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(givenNameReducer, initialState);
  const booted = useRef(false);

  const buildCandidateRequest = (state: GivenNameState): V1GivenNameCandidatesRequest => ({
    decadeIds: state.selectedDecadeIds.length ? state.selectedDecadeIds.join(',') : undefined,
    include: 'etymology',
  });

  const getNewCandidates = async () => {
    try {
      const request = buildCandidateRequest(state);
      console.log('🚀 ~ getNewCandidates ~ request:', request);
      const nameList = await givenNameApi.v1GivenNameCandidates(request);
      dispatch({ type: 'GET_NEW_CANDIDATES', payload: nameList });
    } catch (e) {
      throw e;
    }
  };

  const approveCandidate = async (givenCustomNameBridgeId: number) => {
    const actionRequest: V1GivenNameActionOperationRequest = {
      v1GivenNameActionRequest: {
        givenCustomNameBridgeId,
        newState: ApiV1GivenNameActionPostRequestNewStateEnum.Approved,
      },
    };

    try {
      await givenNameApi.v1GivenNameAction(actionRequest);
      removeCandidate(givenCustomNameBridgeId);
    } catch (e) {
      throw e;
    }
  };

  const rejectCandidate = async (givenCustomNameBridgeId: number) => {
    const actionRequest: V1GivenNameActionOperationRequest = {
      v1GivenNameActionRequest: {
        givenCustomNameBridgeId,
        newState: ApiV1GivenNameActionPostRequestNewStateEnum.Rejected,
      },
    };

    try {
      await givenNameApi.v1GivenNameAction(actionRequest);
      removeCandidate(givenCustomNameBridgeId);
    } catch (e) {
      throw e;
    }
  };

  const snoozeCandidate = async (givenCustomNameBridgeId: number) => {
    const actionRequest: V1GivenNameActionOperationRequest = {
      v1GivenNameActionRequest: {
        givenCustomNameBridgeId,
        newState: ApiV1GivenNameActionPostRequestNewStateEnum.Snoozed,
      },
    };

    try {
      await givenNameApi.v1GivenNameAction(actionRequest);
      removeCandidate(givenCustomNameBridgeId);
    } catch (e) {
      throw e;
    }
  };

  const removeCandidate = (givenCustomNameBridgeId: number) => {
    dispatch({ type: 'REMOVE_CANDIDATE', payload: givenCustomNameBridgeId });
  };

  const addApprovedGivenNames = async () => {
    const approvedGivenNames = await givenNameApi.v1GivenNameApproved();
    dispatch({ type: 'ADD_APPROVED', payload: approvedGivenNames });
  };

  const givenNameProviderLoaded = async () => {
    dispatch({ type: 'GIVEN_NAME_PROVIDER_LOADED' });
  };

  const addSelectedGender = async (selectedGender: Gender) => {
    dispatch({ type: 'ADD_SELECTED_GENDER', payload: selectedGender });
  };

  const removeSelectedGender = async (unselectedGender: Gender) => {
    dispatch({ type: 'REMOVE_SELECTED_GENDER', payload: unselectedGender });
  };

  const addSelectedDecadeIds = async (selectedDecadeIds: number[]) => {
    dispatch({ type: 'ADD_SELECTED_DECADE_ID', payload: selectedDecadeIds });
  };

  const removeSelectedDecadeIds = async (unselectedDecadeIds: number[]) => {
    dispatch({ type: 'REMOVE_SELECTED_DECADE_ID', payload: unselectedDecadeIds });
  };

  useEffect(() => {
    const onLoad = async () => {
      await getNewCandidates();
      await addApprovedGivenNames();
      givenNameProviderLoaded();
    };

    if (booted.current) return;
    booted.current = true;
    onLoad();
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      actions: {
        getNewCandidates,
        approveCandidate,
        rejectCandidate,
        snoozeCandidate,
        addSelectedGender,
        removeSelectedGender,
        addSelectedDecadeIds,
        removeSelectedDecadeIds,
      },
    }),
    [state]
  );

  return <GivenNameContext.Provider value={value}>{state.givenNameProviderLoaded ? children : null}</GivenNameContext.Provider>;
};

export const useGivenNames = () => {
  const context = useContext(GivenNameContext);
  if (!context) {
    throw new Error('useGivenNames must be used inside GivenNamesProvider');
  }
  return context;
};

export const useGivenNamesActions = () => {
  const { actions } = useGivenNames();
  return actions;
};
