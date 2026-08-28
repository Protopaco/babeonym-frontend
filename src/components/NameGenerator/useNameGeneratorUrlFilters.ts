import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { stringToGender } from '@/types/Gender';
import type { Gender } from '@/types/Gender';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  givenNameCandidates: GivenName[];
  selectedCultureIds: number[];
  selectedDecadeIds: number[];
  selectedGenders: Gender[];
  selectedLanguageIds: number[];
};

export const useNameGeneratorUrlFilters = ({
  givenNameCandidates,
  selectedCultureIds,
  selectedDecadeIds,
  selectedGenders,
  selectedLanguageIds,
}: Props) => {
  const { addSelectedGenders, addSelectedDecadeIds, addSelectedLanguageIds, addSelectedCultureIds, getNewCandidates } = useGivenNamesActions();
  const [searchParams, setSearchParams] = useSearchParams();

  const filtersToUrlParams = () => {
    const params = new URLSearchParams();

    if (selectedGenders.length) params.append('genders', [...new Set(selectedGenders)].join(','));
    if (selectedDecadeIds.length) params.append('decades', [...new Set(selectedDecadeIds)].join(','));
    if (selectedLanguageIds.length) params.append('languages', [...new Set(selectedLanguageIds)].join(','));
    if (selectedCultureIds.length) params.append('cultures', [...new Set(selectedCultureIds)].join(','));
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
      cultures,
      decades,
      genders,
      languages,
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
};
