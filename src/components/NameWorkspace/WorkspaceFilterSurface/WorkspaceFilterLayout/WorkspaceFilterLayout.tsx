import WorkspaceFilterActions from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterActions/WorkspaceFilterActions';
import CultureFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/CultureFilterColumn/CultureFilterColumn';
import DecadeFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/DecadeFilterColumn/DecadeFilterColumn';
import GenderFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/GenderFilterColumn/GenderFilterColumn';
import LanguageFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/LanguageFilterColumn/LanguageFilterColumn';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip/WorkspaceAppliedFilterChip';
import WorkspaceClearFiltersButton from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceClearFiltersButton/WorkspaceClearFiltersButton';
import WorkspaceFilterToggle from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterToggle/WorkspaceFilterToggle';
import { useWorkspaceFilterDraftState } from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterLayout/useWorkspaceFilterDraftState';
import { AnimatePresence, motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import './WorkspaceFilterLayout.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterLayout = ({ isOpen, onToggle }: Props) => {
  const {
    appliedFilterChips,
    availableFilterOptions,
    clearAppliedFilters,
    clearDraftFilters,
    commitDraftFilters,
    draftFilters,
    hasAppliedFilters,
    hasDraftFilters,
    setDraftFilters,
  } = useWorkspaceFilterDraftState();

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
        <WorkspaceFilterToggle onToggle={handleToggleFilters} />
        {/* Chips fade in and out and the rest close up, the same as the mobile
            tray. layoutScroll because the row scrolls sideways below desktop:
            without it motion measures chips as if unscrolled. */}
        <motion.div className="workspace-filter-layout-applied-chips" aria-label="Applied filters" layoutScroll>
          <AnimatePresence initial={false}>
            {appliedFilterChips.map((chip) => (
              <motion.div
                key={chip.id}
                className="workspace-filter-layout-applied-chip"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: motionTokens.durationSeconds[180], ease: motionTokens.ease.out }}
              >
                <WorkspaceAppliedFilterChip label={chip.label} onDelete={chip.onDelete} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {/* Absent rather than disabled when nothing is applied: with no chips
            there is no row to bound, and a control that spends most of its life
            greyed out is noise. Fades rather than popping. */}
        <AnimatePresence initial={false}>
          {hasAppliedFilters ? (
            <motion.div
              key="clear-filters"
              className="workspace-filter-layout-clear"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionTokens.durationSeconds[180], ease: motionTokens.ease.out }}
            >
              <WorkspaceClearFiltersButton onClearFilters={clearAppliedFilters} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      {/* The row unmounts when the drawer closes, so it needs AnimatePresence to
          stay mounted long enough to animate out. The height animation lives on
          this wrapper rather than the row itself: the wrapper clips, so the
          row's own padding collapses with it and the row keeps its layout. */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="workspace-filter-layout-selector-reveal"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
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
              <WorkspaceFilterActions
                isOpen={isOpen}
                onClearAll={clearDraftFilters}
                onClose={handleCloseFilters}
                onSetFilters={handleSetFilters}
                disabled={!hasDraftFilters}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkspaceFilterLayout;
