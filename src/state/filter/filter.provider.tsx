import { useRef, useReducer, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { FilterState } from '@/state/filter/filter.types';
import { filterReducer } from '@/state/filter/filter.reducer';
import { referenceApi } from '@/api/client';
import { FilterContext } from '@/state/filter/filter.context';
import type { CultureWithRegions, LanguageWithRegions } from '@/api/generated';
import { useUser } from '@/state/user/user.context';

const initialState: FilterState = {
  cultures: [],
  decades: [],
  languages: [],
  nameFilters: {
    genderOptions: [],
    decadeOptions: [],
    cultureOptions: [],
    languageOptions: [],
  },
};

const filterEmptyCultureSections = (cultures: CultureWithRegions[]) => {
  return cultures
    .map((continent) => ({
      ...continent,
      regions: continent.regions.filter((region) => region.cultures.length > 0),
    }))
    .filter((continent) => continent.regions.length > 0);
};

const filterEmptyLanguageSections = (languages: LanguageWithRegions[]) => {
  return languages
    .map((continent) => ({
      ...continent,
      regions: continent.regions.filter((region) => region.languages.length > 0),
    }))
    .filter((continent) => continent.regions.length > 0);
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const {
    state: { user, userProviderLoaded },
  } = useUser();
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
      dispatch({ type: 'ADD_CULTURES', payload: filterEmptyCultureSections(cultures) });
    }
  };

  const addLanguages = async () => {
    if (state.languages.length < 1) {
      const { languages } = await referenceApi.v1ReferenceLanguages();
      dispatch({ type: 'ADD_LANGUAGES', payload: filterEmptyLanguageSections(languages) });
    }
  };

  // The flat option lists the desktop filter surface reads. The three calls
  // above stay because the mobile accordions still need the region hierarchy.
  const addNameFilters = async () => {
    if (state.nameFilters.genderOptions.length < 1) {
      const { nameFilters } = await referenceApi.v1ReferenceNameFilters();
      dispatch({ type: 'ADD_NAME_FILTERS', payload: nameFilters });
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      try {
        await addDecades();
        await addCultures();
        await addLanguages();
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
