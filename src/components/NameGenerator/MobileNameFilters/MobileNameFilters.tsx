import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip/WorkspaceAppliedFilterChip';
import WorkspaceClearFiltersButton from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceClearFiltersButton/WorkspaceClearFiltersButton';
import MobileFilterDrawer from '@/components/NameGenerator/MobileNameFilters/MobileFilterDrawer/MobileFilterDrawer';
import { mobileFilterCategories } from '@/components/NameGenerator/MobileNameFilters/mobileFilterCategories';
import type { MobileFilterCategory } from '@/models/MobileFilterCategory';
import { useMobileAppliedFilterChips } from '@/components/NameGenerator/MobileNameFilters/useMobileAppliedFilterChips';
import { useAppLayoutState } from '@/state/appLayoutState/useAppLayoutState';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './MobileNameFilters.css';

const FILTERS_HINT = "Narrows the names you're shown";

type Props = {
  isLoading: boolean;
};

export default ({ isLoading }: Props) => {
  const { setMobileFilterDrawerOpen } = useAppLayoutState();
  const [openCategory, setOpenCategory] = useState<MobileFilterCategory | null>(null);
  const { appliedFilterChips, clearAppliedFilters } = useMobileAppliedFilterChips();

  // The layout state drives sibling chrome, so it follows whichever category is
  // open rather than a drawer of its own.
  useEffect(() => {
    setMobileFilterDrawerOpen(openCategory !== null);
  }, [openCategory, setMobileFilterDrawerOpen]);

  useEffect(() => {
    return () => setMobileFilterDrawerOpen(false);
  }, [setMobileFilterDrawerOpen]);

  return (
    // Slides itself rather than being slid by a wrapper: the tray is position:
    // fixed, and a transformed ancestor would become what it is fixed against.
    // Same duration and easing as the workspace panes, so it leaves with them.
    <motion.div
      className={`mobile-name-filters ${appliedFilterChips.length > 0 ? 'mobile-name-filters--has-chips' : ''}`}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.out }}
    >
      {/* Grows from nothing and collapses back, rather than the tray jumping by
          the row's height. Eased at both ends like WorkspaceFilterSurface's
          reveal, which moves a similarly short distance. */}
      <AnimatePresence initial={false}>
        {appliedFilterChips.length > 0 && (
          <motion.div
            className="mobile-name-filters-chips-reveal"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.inOut }}
          >
            {/* Clear All arrives and leaves with the row, so it needs no fade of
                its own. The tray is primary like desktop's strip, so desktop's
                button is reused, icon only for the narrow row. */}
            <div className="mobile-name-filters-chips-row">
              {/* layoutScroll because the row scrolls sideways: without it motion
                  measures chips as if unscrolled, and one removed while the row is
                  scrolled slides the rest from the wrong place. */}
              <motion.div className="mobile-name-filters-chips themed-scrollbar" aria-label="Applied filters" layoutScroll>
                {/* Default mode rather than popLayout. A leaving chip holds its
                    space while it fades and the rest close up after; popLayout
                    would position it against an ancestor that knows nothing of
                    the row's scroll. No initial fade, since the first chip already
                    arrives with the row. */}
                <AnimatePresence initial={false}>
                  {appliedFilterChips.map((chip) => (
                    <motion.div
                      key={chip.id}
                      className="mobile-name-filters-chip"
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
              <WorkspaceClearFiltersButton onClearFilters={clearAppliedFilters} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* One hint for the row rather than one per button. The labels already say
          which category each button is; what they do not say is what the row is
          for. Same words as the desktop Filters toggle, so the idea reads the
          same at both widths.

          On the row rather than on the buttons because the tooltip wraps its
          child in spans, and a span in place of a button cannot shrink — at a
          narrow width that pushed LANGUAGE off the screen. Unwrapped, the
          buttons size themselves as the tray's CSS intends.

          Not on the tray itself: it is position: fixed, so the span around it
          has nothing in flow to measure and the bubble would anchor to the
          wrong place. The applied chips stay outside the hint as well, so their
          delete buttons act on the first tap. */}
      <TutorialTooltip title={FILTERS_HINT} placement="top">
        <Box className="mobile-name-filters-triggers">
          {mobileFilterCategories.map((category) => (
            <SecondaryButton
              key={category.id}
              text={category.buttonLabel}
              disabled={isLoading}
              surface="primary"
              tone="action"
              onClick={() => setOpenCategory(category)}
            />
          ))}
        </Box>
      </TutorialTooltip>
      <MobileFilterDrawer category={openCategory} onClose={() => setOpenCategory(null)} />
    </motion.div>
  );
};
