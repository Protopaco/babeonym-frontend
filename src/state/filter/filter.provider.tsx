import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { FilterState, FilterAction } from '@/state/filter/filter.types';
import { filterReducer } from '@/state/filter/filter.reducer';
import { referenceApi } from '@/api/client';
import { FilterContext } from '@/state/filter/filter.context';

const initialState: FilterState = {
  decades: [],
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const addDecades = async () => {
    console.log('🚀 ~ addDecades ~ state.decades.length:', state.decades.length);
    if (state.decades.length < 1) {
      const { decades } = await referenceApi.v1ReferenceDecades();
      dispatch({ type: 'ADD_DECADES', payload: decades });
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await addDecades();
    };

    onLoad();
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
