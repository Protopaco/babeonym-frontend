import { useRef, useReducer, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { FilterState } from '@/state/filter/filter.types';
import { filterReducer } from '@/state/filter/filter.reducer';
import { referenceApi } from '@/api/client';
import { FilterContext } from '@/state/filter/filter.context';

const initialState: FilterState = {
  cultures: [],
  decades: [],
  languages: [],
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const booted = useRef(false);

  const addDecades = async () => {
    if (state.decades.length < 1) {
      const { decades } = await referenceApi.v1ReferenceDecades();
      dispatch({ type: 'ADD_DECADES', payload: decades });
    }
  };

  const addCultures = async () => {
    if (state.cultures.length < 1) {
      const { cultures } = await referenceApi.v1ReferenceCultures();
      dispatch({ type: 'ADD_CULTURES', payload: cultures });
    }
  };

  const addLanguages = async () => {
    if (state.languages.length < 1) {
      const { languages } = await referenceApi.v1ReferenceLanguages();
      dispatch({ type: 'ADD_LANGUAGES', payload: languages });
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await addDecades();
      await addCultures();
      await addLanguages();
    };

    if (booted.current) return;
    booted.current = true;
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
