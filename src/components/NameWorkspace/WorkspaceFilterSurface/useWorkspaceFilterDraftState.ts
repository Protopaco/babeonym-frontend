import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockNameFilterReferenceData } from '@/components/NameWorkspace/WorkspaceFilterSurface/mockNameFilterReferenceData';
import type { FilterPickerOption } from '@/models/FilterPickerOption';

type WorkspaceFilterSelections = {
  genders: number[];
  decades: number[];
  cultures: number[];
  languages: number[];
};

const emptySelections: WorkspaceFilterSelections = {
  genders: [],
  decades: [],
  cultures: [],
  languages: [],
};

export const useWorkspaceFilterDraftState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [draftFilters, setDraftFilters] = useState<WorkspaceFilterSelections>(emptySelections);

  const appliedFilters = useMemo<WorkspaceFilterSelections>(
    () => ({
      genders: [...new Set((searchParams.get('genders') ?? '').split(',').map(Number).filter((filterId) => Number.isInteger(filterId) && filterId > 0))],
      decades: [...new Set((searchParams.get('decades') ?? '').split(',').map(Number).filter((filterId) => Number.isInteger(filterId) && filterId > 0))],
      cultures: [...new Set((searchParams.get('cultures') ?? '').split(',').map(Number).filter((filterId) => Number.isInteger(filterId) && filterId > 0))],
      languages: [...new Set((searchParams.get('languages') ?? '').split(',').map(Number).filter((filterId) => Number.isInteger(filterId) && filterId > 0))],
    }),
    [searchParams]
  );

  const appliedFilterSets = useMemo(
    () => ({
      genders: new Set(appliedFilters.genders),
      decades: new Set(appliedFilters.decades),
      cultures: new Set(appliedFilters.cultures),
      languages: new Set(appliedFilters.languages),
    }),
    [appliedFilters]
  );

  const availableFilterOptions = useMemo(
    () => ({
      genders: mockNameFilterReferenceData.genderOptions.filter((option) => !appliedFilterSets.genders.has(option.id)),
      decades: mockNameFilterReferenceData.decadeOptions.filter((option) => !appliedFilterSets.decades.has(option.id)),
      cultures: mockNameFilterReferenceData.cultureOptions.filter((option) => !appliedFilterSets.cultures.has(option.id)),
      languages: mockNameFilterReferenceData.languageOptions.filter((option) => !appliedFilterSets.languages.has(option.id)),
    }),
    [appliedFilterSets]
  );

  const removeAppliedFilter = (filterKey: keyof WorkspaceFilterSelections, filterId: number) => {
    const nextParams = new URLSearchParams(searchParams);
    const nextFilterIds = appliedFilters[filterKey].filter((selectedFilterId) => selectedFilterId !== filterId);

    if (nextFilterIds.length > 0) {
      nextParams.set(filterKey, nextFilterIds.join(','));
    } else {
      nextParams.delete(filterKey);
    }

    setSearchParams(nextParams, { replace: true });
  };

  const appliedFilterChips = useMemo(() => {
    const categoryChips = (categoryLabel: string, selectedIds: number[], options: FilterPickerOption[], onDelete: (filterId: number) => void) =>
      selectedIds
        .map((filterId) => options.find((option) => option.id === filterId))
        .filter((option): option is FilterPickerOption => option !== undefined)
        .map((option) => ({
          id: `${categoryLabel}-${option.id}`,
          label: `${categoryLabel}: ${option.label}`,
          onDelete: () => onDelete(option.id),
        }));

    return [
      ...categoryChips('Gender', appliedFilters.genders, mockNameFilterReferenceData.genderOptions, (filterId) =>
        removeAppliedFilter('genders', filterId)
      ),
      ...categoryChips('Decade', appliedFilters.decades, mockNameFilterReferenceData.decadeOptions, (filterId) =>
        removeAppliedFilter('decades', filterId)
      ),
      ...categoryChips('Culture', appliedFilters.cultures, mockNameFilterReferenceData.cultureOptions, (filterId) =>
        removeAppliedFilter('cultures', filterId)
      ),
      ...categoryChips('Language', appliedFilters.languages, mockNameFilterReferenceData.languageOptions, (filterId) =>
        removeAppliedFilter('languages', filterId)
      ),
    ];
  }, [appliedFilters]);

  const hasDraftFilters = Object.values(draftFilters).some((selectedIds) => selectedIds.length > 0);

  const commitDraftFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    const nextFilters = {
      genders: [...new Set([...appliedFilters.genders, ...draftFilters.genders])],
      decades: [...new Set([...appliedFilters.decades, ...draftFilters.decades])],
      cultures: [...new Set([...appliedFilters.cultures, ...draftFilters.cultures])],
      languages: [...new Set([...appliedFilters.languages, ...draftFilters.languages])],
    };

    Object.entries(nextFilters).forEach(([filterKey, selectedIds]) => {
      if (selectedIds.length > 0) {
        nextParams.set(filterKey, selectedIds.join(','));
      } else {
        nextParams.delete(filterKey);
      }
    });

    setSearchParams(nextParams, { replace: true });
    setDraftFilters(emptySelections);
  };

  return {
    appliedFilterChips,
    availableFilterOptions,
    commitDraftFilters,
    draftFilters,
    hasDraftFilters,
    setDraftFilters,
  };
};
