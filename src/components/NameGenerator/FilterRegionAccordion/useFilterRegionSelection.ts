type Props = {
  addSelectedIds: (ids: number[]) => void;
  itemIds: number[];
  removeSelectedIds: (ids: number[]) => void;
  selectedIds: number[];
};

export const useFilterRegionSelection = ({ addSelectedIds, itemIds, removeSelectedIds, selectedIds }: Props) => {
  const anySelected = itemIds.some((id) => selectedIds.includes(id));
  const showToggleAll = itemIds.length > 3;

  const selectAll = () => {
    const currentUnselectedIds = itemIds.filter((id) => !selectedIds.includes(id));
    addSelectedIds(currentUnselectedIds);
  };

  const unselectAll = () => {
    const currentSelectedIds = itemIds.filter((id) => selectedIds.includes(id));
    removeSelectedIds(currentSelectedIds);
  };

  const getItemSelected = (id: number) => selectedIds.includes(id);

  const getItemAction = (id: number) => {
    return getItemSelected(id)
      ? () => {
          removeSelectedIds([id]);
        }
      : () => {
          addSelectedIds([id]);
        };
  };

  return {
    anySelected,
    getItemAction,
    getItemSelected,
    selectAll,
    showToggleAll,
    unselectAll,
  };
};
