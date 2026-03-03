import { useContext, useReducer, useEffect, useMemo } from 'react';
import { givenNameApi } from '@/api/client';
import type { ReactNode } from 'react';
import { ApiV1GivenNameActionPostRequestNewStateEnum } from '@/api/generated/models/ApiV1GivenNameActionPostRequest';
import type { V1GivenNameActionOperationRequest } from '@/api/generated/apis/GivenNameApi';
import { GivenNameContext } from '@/state/givenName/givenName.context';
import type { GivenNameState } from '@/state/givenName/givenName.types';
import { givenNameReducer } from '@/state/givenName/givenName.reducer';

const initialState: GivenNameState = {
  givenNameCandidates: [],
  approvedGivenNames: [],
  givenNameProviderLoaded: false,
};

export const GivenNameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(givenNameReducer, initialState);

  const addCandidates = async () => {
    if (state.givenNameCandidates.length < 10) {
      try {
        const nameList = await givenNameApi.v1GivenNameCandidates();
        dispatch({ type: 'ADD_CANDIDATES', payload: nameList });
      } catch (e) {
        throw e;
      }
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

  const givenNameProviderLoaded = () => {
    dispatch({ type: 'GIVEN_NAME_PROVIDER_LOADED' });
  };

  useEffect(() => {
    const onLoad = async () => {
      await addCandidates();
      await addApprovedGivenNames();
      givenNameProviderLoaded();
    };

    onLoad();
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      actions: { approveCandidate, rejectCandidate, snoozeCandidate },
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
