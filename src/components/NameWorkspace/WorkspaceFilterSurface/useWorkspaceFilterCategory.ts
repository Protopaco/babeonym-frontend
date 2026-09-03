import { useMemo, useState } from 'react';
import { parseFilterIds } from '@/utils/parseFilterIds';
import { writeFilterIds } from '@/components/NameWorkspace/WorkspaceFilterSurface/writeFilterIds';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import type { WorkspaceAppliedFilterChip } from '@/models/WorkspaceAppliedFilterChip';

type Props = {
  categoryLabel: string;
  options: FilterPickerOption[];
  paramKey: string;
  searchParams: URLSearchParams;
  setSearchParams: (nextParams: URLSearchParams, options: { replace: boolean }) => void;
};

export const useWorkspaceFilterCategory = ({ categoryLabel, options, paramKey, searchParams, setSearchParams }: Props) => {
  const [draftOptionIds, setDraftOptionIds] = useState<number[]>([]);
  const appliedOptionIds = useMemo(() => parseFilterIds(searchParams, paramKey), [paramKey, searchParams]);
  const appliedOptionIdSet = useMemo(() => new Set(appliedOptionIds), [appliedOptionIds]);
  const availableOptions = useMemo(() => options.filter((option) => !appliedOptionIdSet.has(option.id)), [appliedOptionIdSet, options]);

  const removeAppliedOption = (optionId: number) => {
    const nextParams = new URLSearchParams(searchParams);
    writeFilterIds(
      nextParams,
      paramKey,
      appliedOptionIds.filter((appliedOptionId) => appliedOptionId !== optionId)
    );
    setSearchParams(nextParams, { replace: true });
  };

  const appliedFilterChips = useMemo<WorkspaceAppliedFilterChip[]>(
    () =>
      appliedOptionIds
        .map((optionId) => options.find((option) => option.id === optionId))
        .filter((option): option is FilterPickerOption => option !== undefined)
        .map((option) => ({
          id: `${paramKey}-${option.id}`,
          label: `${categoryLabel}: ${option.label}`,
          onDelete: () => removeAppliedOption(option.id),
        })),
    [appliedOptionIds, options]
  );

  const applyDraftToParams = (nextParams: URLSearchParams) => {
    writeFilterIds(nextParams, paramKey, [...new Set([...appliedOptionIds, ...draftOptionIds])]);
  };

  return {
    appliedFilterChips,
    applyDraftToParams,
    availableOptions,
    clearDraft: () => setDraftOptionIds([]),
    draftOptionIds,
    hasDraftOptions: draftOptionIds.length > 0,
    setDraftOptionIds,
  };
};
