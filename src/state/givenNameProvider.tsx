import { createContext, useContext, useReducer, useEffect } from 'react';
import { givenNameApi } from '@/api/client';
import type { ReactNode } from 'react';
import type { GivenName } from '@/api/generated/models/GivenName';

type State = {
  givenNameCandidates: GivenName[] | null;
  givenNameProviderLoaded: boolean;
};

type Action = { type: 'ADD_CANDIDATES'; payload: GivenName[] } | { type: 'GIVEN_NAME_PROVIDER_LOADED' };

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
    case 'GIVEN_NAME_PROVIDER_LOADED': {
      return { ...state, givenNameProviderLoaded: true };
    }
    default:
      return state;
  }
};

const GivenNamesContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

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

  return (
    <GivenNamesContext.Provider value={{ state, dispatch }}>
      {state.givenNameProviderLoaded && state.givenNameCandidates && state.givenNameCandidates.length > 0 ? children : null}
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
