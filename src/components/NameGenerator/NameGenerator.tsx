import FilterDrawer from '@/components/NameGenerator/FilterDrawer/FilterDrawer';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useState, useEffect } from 'react';
import NameEvaluator from '@/components/NameGenerator/NameEvaluator/NameEvaluator';
import Box from '@mui/material/Box';
import { stringToGender } from '@/types/Gender';
import type { Gender } from '@/types/Gender';
import { useSearchParams } from 'react-router-dom';

export default () => {
  const givenNameContext = useGivenNames();
  const { addSelectedGenders, addSelectedDecadeIds, addSelectedLanguageIds, addSelectedCultureIds, getNewCandidates } = useGivenNamesActions();
  const { selectedCultureIds, selectedDecadeIds, selectedGenders, selectedLanguageIds, givenNameCandidates } = givenNameContext.state;
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const filtersToUrlParams = () => {
    const params = new URLSearchParams();

    if (selectedGenders.length) params.append('genders', [...new Set(selectedGenders)].join(','));
    if (selectedDecadeIds.length) params.append('decades', [...new Set(selectedDecadeIds)].join(','));
    if (selectedLanguageIds.length) params.append('languages', [...new Set(selectedLanguageIds)].join(','));
    if (selectedCultureIds.length) params.append('culture', [...new Set(selectedCultureIds)].join(','));
    setSearchParams(params, { replace: true });
  };

  const urlParamsToFilters = () => {
    const genders: Gender[] | undefined = searchParams
      .get('genders')
      ?.split(',')
      .map(stringToGender)
      .filter((gender): gender is Gender => gender !== null);

    const decades: number[] | undefined = searchParams
      .get('decades')
      ?.split(',')
      .map(Number)
      .filter((decadeId): number => decadeId);

    const languages: number[] | undefined = searchParams
      .get('languages')
      ?.split(',')
      .map(Number)
      .filter((languageId): number => languageId);

    const cultures: number[] | undefined = searchParams
      .get('cultures')
      ?.split(',')
      .map(Number)
      .filter((cultureId): number => cultureId);

    return {
      genders,
      decades,
      languages,
      cultures,
    };
  };

  useEffect(() => {
    filtersToUrlParams();
  }, [givenNameCandidates]);

  useEffect(() => {
    const updateCandidates = async (genders?: string[], decades?: number[], languages?: number[], cultures?: number[]) => {
      await getNewCandidates(genders, decades, languages, cultures);
    };
    const { genders, decades, languages, cultures } = urlParamsToFilters();

    if (genders) addSelectedGenders(genders);
    if (decades) addSelectedDecadeIds(decades);
    if (languages) addSelectedLanguageIds(languages);
    if (cultures) addSelectedCultureIds(cultures);
    if (genders || decades || languages || cultures) {
      updateCandidates(genders, decades, languages, cultures);
    }
  }, []);

  return (
    <Box>
      <FilterDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <NameEvaluator drawerOpen={drawerOpen} />
    </Box>
  );
};
