import WorkspaceFilterActions from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterActions';
import CultureFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/CultureFilterColumn';
import DecadeFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/DecadeFilterColumn';
import GenderFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/GenderFilterColumn';
import LanguageFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/LanguageFilterColumn';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import WorkspaceFilterToggle from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterToggle';
import { useWorkspaceFilterDraftState } from '@/components/NameWorkspace/WorkspaceFilterSurface/useWorkspaceFilterDraftState';
import { useSyncWorkspaceFilterParams } from '@/components/NameWorkspace/WorkspaceFilterSurface/useSyncWorkspaceFilterParams';
import './WorkspaceFilterLayout.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterLayout = ({ isOpen, onToggle }: Props) => {
  const { appliedFilterChips, availableFilterOptions, clearDraftFilters, commitDraftFilters, draftFilters, hasDraftFilters, setDraftFilters } =
    useWorkspaceFilterDraftState();

  useSyncWorkspaceFilterParams();

  const handleSetFilters = () => {
    commitDraftFilters();
    onToggle();
  };

  const handleCloseFilters = () => {
    clearDraftFilters();
    onToggle();
  };

  const handleToggleFilters = () => {
    if (isOpen) {
      clearDraftFilters();
    }

    onToggle();
  };

  return (
    <div className="workspace-filter-layout">
      <div className="workspace-filter-layout-summary-row">
        <WorkspaceFilterToggle isOpen={isOpen} onToggle={handleToggleFilters} />
        <div className="workspace-filter-layout-applied-chips" aria-label="Applied filters">
          {appliedFilterChips.map((chip) => (
            <WorkspaceAppliedFilterChip key={chip.id} label={chip.label} onDelete={chip.onDelete} />
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="workspace-filter-layout-selector-row">
          <div className="workspace-filter-layout-columns" aria-label="Available filter categories">
            <GenderFilterColumn
              options={availableFilterOptions.genders}
              selectedOptionIds={draftFilters.genders}
              onChange={setDraftFilters.genders}
            />
            <DecadeFilterColumn
              options={availableFilterOptions.decades}
              selectedOptionIds={draftFilters.decades}
              onChange={setDraftFilters.decades}
            />
            <CultureFilterColumn
              options={availableFilterOptions.cultures}
              selectedOptionIds={draftFilters.cultures}
              onChange={setDraftFilters.cultures}
            />
            <LanguageFilterColumn
              options={availableFilterOptions.languages}
              selectedOptionIds={draftFilters.languages}
              onChange={setDraftFilters.languages}
            />
          </div>
          <WorkspaceFilterActions isOpen={isOpen} onClose={handleCloseFilters} onSetFilters={handleSetFilters} disabled={!hasDraftFilters} />
        </div>
      )}
    </div>
  );
};

export default WorkspaceFilterLayout;
