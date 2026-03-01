import { createContext, useContext, useState, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { GivenName } from '@/api/generated/models/GivenName';

type State = {
  givenNameCandidates: GivenName[] | null;
};

type Action = { type: 'ADD_CANDIDATES'; payload: GivenName[] };

const initialState: State = {
  givenNameCandidates: [],
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_CANDIDATES':
      const { payload } = action;
      return { ...state, givenNameCandidates: state.givenNameCandidates ? [...state.givenNameCandidates, ...payload] : [...payload] };
  }
};

const GivenNamesContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const GivenNameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GivenNamesContext.Provider value={{ state, dispatch }}>{children}</GivenNamesContext.Provider>;
};

export const useGivenNames = () => {
  const context = useContext(GivenNamesContext);
  if (!context) {
    throw new Error('useGivenNames must be used inside GivenNamesProvider');
  }
  return context;
};
