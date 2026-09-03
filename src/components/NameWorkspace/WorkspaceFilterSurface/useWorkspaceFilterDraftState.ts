import { useSearchParams } from 'react-router-dom';
import { useFilters } from '@/state/filter/filter.context';
import { useWorkspaceFilterCategory } from '@/components/NameWorkspace/WorkspaceFilterSurface/useWorkspaceFilterCategory';

export const useWorkspaceFilterDraftState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    state: { nameFilters },
  } = useFilters();
  const genderFilters = useWorkspaceFilterCategory({
    categoryLabel: 'Gender',
    options: nameFilters.genderOptions,
    paramKey: 'genders',
    searchParams,
    setSearchParams,
  });
  const decadeFilters = useWorkspaceFilterCategory({
    categoryLabel: 'Decade',
    options: nameFilters.decadeOptions,
    paramKey: 'decades',
    searchParams,
    setSearchParams,
  });
  const cultureFilters = useWorkspaceFilterCategory({
    categoryLabel: 'Culture',
    options: nameFilters.cultureOptions,
    paramKey: 'cultures',
    searchParams,
    setSearchParams,
  });
  const languageFilters = useWorkspaceFilterCategory({
    categoryLabel: 'Language',
    options: nameFilters.languageOptions,
    paramKey: 'languages',
    searchParams,
    setSearchParams,
  });
  const filterCategories = [genderFilters, decadeFilters, cultureFilters, languageFilters];
  const hasDraftFilters = filterCategories.some((filterCategory) => filterCategory.hasDraftOptions);

  const commitDraftFilters = () => {
    const nextParams = new URLSearchParams(searchParams);

    filterCategories.forEach((filterCategory) => filterCategory.applyDraftToParams(nextParams));
    setSearchParams(nextParams, { replace: true });
    filterCategories.forEach((filterCategory) => filterCategory.clearDraft());
  };

  return {
    appliedFilterChips: filterCategories.flatMap((filterCategory) => filterCategory.appliedFilterChips),
    availableFilterOptions: {
      cultures: cultureFilters.availableOptions,
      decades: decadeFilters.availableOptions,
      genders: genderFilters.availableOptions,
      languages: languageFilters.availableOptions,
    },
    clearDraftFilters: () => filterCategories.forEach((filterCategory) => filterCategory.clearDraft()),
    commitDraftFilters,
    draftFilters: {
      cultures: cultureFilters.draftOptionIds,
      decades: decadeFilters.draftOptionIds,
      genders: genderFilters.draftOptionIds,
      languages: languageFilters.draftOptionIds,
    },
    hasDraftFilters,
    setDraftFilters: {
      cultures: cultureFilters.setDraftOptionIds,
      decades: decadeFilters.setDraftOptionIds,
      genders: genderFilters.setDraftOptionIds,
      languages: languageFilters.setDraftOptionIds,
    },
  };
};
