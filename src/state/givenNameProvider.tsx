import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { givenNameApi } from '@/api/client';
import type { ReactNode } from 'react';
import type { GivenName } from '@/api/generated/models/GivenName';
import { ApiV1GivenNameActionPostRequestNewStateEnum } from '@/api/generated/models/ApiV1GivenNameActionPostRequest';
import type { V1GivenNameActionOperationRequest } from '@/api/generated/apis/GivenNameApi';

type State = {
  givenNameCandidates: GivenName[];
  givenNameProviderLoaded: boolean;
};

type Action =
  | { type: 'ADD_CANDIDATES'; payload: GivenName[] }
  | { type: 'GIVEN_NAME_PROVIDER_LOADED' }
  | { type: 'REMOVE_CANDIDATE'; payload: number };

const initialState: State = {
  givenNameCandidates: [],
  givenNameProviderLoaded: false,
};

const reducer = (state: State, action: Action): State => {
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
        console.log('{{{{{{{{{{{{{{{{{{{{{{{{{');
        console.log(filteredCandidates);
        console.log(state.givenNameCandidates);
        filteredCandidates = state.givenNameCandidates.filter(({ givenCustomNameBridgeId }) => givenCustomNameBridgeId !== action.payload);
      }

      return { ...state, givenNameCandidates: filteredCandidates };
    }
    case 'GIVEN_NAME_PROVIDER_LOADED': {
      return { ...state, givenNameProviderLoaded: true };
    }
    default:
      return state;
  }
};

const GivenNamesContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
      actions: {
        approveCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        rejectCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        snoozeCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
      };
    }
  | undefined
>(undefined);

export const GivenNameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addCandidates = async () => {
    try {
      const nameList = await givenNameApi.v1GivenNameCandidates();
      dispatch({ type: 'ADD_CANDIDATES', payload: nameList });
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

  const givenNameProviderLoaded = () => {
    dispatch({ type: 'GIVEN_NAME_PROVIDER_LOADED' });
  };

  useEffect(() => {
    const onLoad = async () => {
      addCandidates();
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

  return (
    <GivenNamesContext.Provider value={value}>
      {state.givenNameProviderLoaded && state.givenNameCandidates.length > 0 ? children : null}
    </GivenNamesContext.Provider>
  );
};

export const useGivenNames = () => {
  const context = useContext(GivenNamesContext);
  if (!context) {
    throw new Error('useGivenNames must be used inside GivenNamesProvider');
  }
  return context;
};

export const useGivenNamesActions = () => {
  const { actions } = useGivenNames();
  return actions;
};
