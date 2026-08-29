import WorkspaceFilterActions from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterActions';
import CultureFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/CultureFilterColumn';
import DecadeFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/DecadeFilterColumn';
import GenderFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/GenderFilterColumn';
import LanguageFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/LanguageFilterColumn';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import WorkspaceFilterToggle from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterToggle';
import { useWorkspaceFilterDraftState } from '@/components/NameWorkspace/WorkspaceFilterSurface/useWorkspaceFilterDraftState';
import './WorkspaceFilterLayout.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterLayout = ({ isOpen, onToggle }: Props) => {
  const { appliedFilterChips, availableFilterOptions, commitDraftFilters, draftFilters, hasDraftFilters, setDraftFilters } =
    useWorkspaceFilterDraftState();

  const handleSetFilters = () => {
    commitDraftFilters();
    onToggle();
  };

  return (
    <div className="workspace-filter-layout">
      <div className="workspace-filter-layout-summary-row">
        <WorkspaceFilterToggle isOpen={isOpen} onToggle={onToggle} />
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
              onChange={(genders) => setDraftFilters((currentFilters) => ({ ...currentFilters, genders }))}
            />
            <DecadeFilterColumn
              options={availableFilterOptions.decades}
              selectedOptionIds={draftFilters.decades}
              onChange={(decades) => setDraftFilters((currentFilters) => ({ ...currentFilters, decades }))}
            />
            <CultureFilterColumn
              options={availableFilterOptions.cultures}
              selectedOptionIds={draftFilters.cultures}
              onChange={(cultures) => setDraftFilters((currentFilters) => ({ ...currentFilters, cultures }))}
            />
            <LanguageFilterColumn
              options={availableFilterOptions.languages}
              selectedOptionIds={draftFilters.languages}
              onChange={(languages) => setDraftFilters((currentFilters) => ({ ...currentFilters, languages }))}
            />
          </div>
          <WorkspaceFilterActions isOpen={isOpen} onSetFilters={handleSetFilters} disabled={!hasDraftFilters} />
        </div>
      )}
    </div>
  );
};

export default WorkspaceFilterLayout;
