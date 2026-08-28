import { useState } from 'react';

export type FilterAccordionId = 'gender' | 'decades' | 'languages' | 'cultures';

const collapsedFilters: Record<FilterAccordionId, boolean> = {
  gender: false,
  decades: false,
  languages: false,
  cultures: false,
};

export const useFilterAccordionState = () => {
  const [expandedFilters, setExpandedFilters] = useState<Record<FilterAccordionId, boolean>>(collapsedFilters);

  const handleFilterAccordionChange = (filterId: FilterAccordionId) => (_event: React.SyntheticEvent, expanded: boolean) => {
    setExpandedFilters((currentExpandedFilters) => ({
      ...currentExpandedFilters,
      [filterId]: expanded,
    }));
  };

  const collapseAllFilters = () => {
    setExpandedFilters(collapsedFilters);
  };

  return {
    collapseAllFilters,
    expandedFilters,
    handleFilterAccordionChange,
  };
};
