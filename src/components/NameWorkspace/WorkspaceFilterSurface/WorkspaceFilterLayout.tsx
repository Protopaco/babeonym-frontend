import WorkspaceFilterActions from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterActions';
import CultureFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/CultureFilterColumn';
import DecadeFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/DecadeFilterColumn';
import GenderFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/GenderFilterColumn';
import LanguageFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/LanguageFilterColumn';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import WorkspaceFilterToggle from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterToggle';
import { useWorkspaceFilterDraftState } from '@/components/NameWorkspace/WorkspaceFilterSurface/useWorkspaceFilterDraftState';
import { AnimatePresence, motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import './WorkspaceFilterLayout.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterLayout = ({ isOpen, onToggle }: Props) => {
  const { appliedFilterChips, availableFilterOptions, clearDraftFilters, commitDraftFilters, draftFilters, hasDraftFilters, setDraftFilters } =
    useWorkspaceFilterDraftState();

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
      {/* The row unmounts when the drawer closes, so it needs AnimatePresence to
          stay mounted long enough to animate out. The height animation lives on
          this wrapper rather than the row itself: the wrapper clips, so the
          row's own padding collapses with it and the row keeps its layout. */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="workspace-filter-layout-selector-reveal"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.out }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkspaceFilterLayout;
