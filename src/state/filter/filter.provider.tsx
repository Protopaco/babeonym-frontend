import { useRef, useReducer, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { FilterState } from '@/state/filter/filter.types';
import { filterReducer } from '@/state/filter/filter.reducer';
import { referenceApi } from '@/api/client';
import { FilterContext } from '@/state/filter/filter.context';
import { useUser } from '@/state/user/user.context';

const initialState: FilterState = {
  nameFilters: {
    genderOptions: [],
    decadeOptions: [],
    cultureOptions: [],
    languageOptions: [],
  },
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const {
    state: { user, userProviderLoaded },
  } = useUser();
  const booted = useRef(false);

  const addNameFilters = async () => {
    if (state.nameFilters.genderOptions.length < 1) {
      const { nameFilters } = await referenceApi.v1ReferenceNameFilters();
      dispatch({ type: 'ADD_NAME_FILTERS', payload: nameFilters });
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      try {
        await addNameFilters();
      } catch (error) {
        console.error('Unable to load filter reference data.', error);
      }
    };

    if (booted.current || !userProviderLoaded || !user) return;
    booted.current = true;
    onLoad();
  }, [userProviderLoaded, user]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
