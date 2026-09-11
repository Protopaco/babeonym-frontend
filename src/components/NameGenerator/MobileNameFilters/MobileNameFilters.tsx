import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import MobileFilterDrawer from '@/components/NameGenerator/MobileNameFilters/MobileFilterDrawer';
import { mobileFilterCategories } from '@/components/NameGenerator/MobileNameFilters/mobileFilterCategories';
import type { MobileFilterCategory } from '@/components/NameGenerator/MobileNameFilters/mobileFilterCategories';
import { useMobileAppliedFilterChips } from '@/components/NameGenerator/MobileNameFilters/useMobileAppliedFilterChips';
import { useAppLayoutState } from '@/state/appLayoutState/appLayoutState.context';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './MobileNameFilters.css';

const FILTERS_HINT = "Narrows the names you're shown";

type Props = {
  isLoading: boolean;
};

export default ({ isLoading }: Props) => {
  const { setMobileFilterDrawerOpen } = useAppLayoutState();
  const [openCategory, setOpenCategory] = useState<MobileFilterCategory | null>(null);
  const appliedFilterChips = useMobileAppliedFilterChips();

  // The layout state drives sibling chrome, so it follows whichever category is
  // open rather than a drawer of its own.
  useEffect(() => {
    setMobileFilterDrawerOpen(openCategory !== null);
  }, [openCategory, setMobileFilterDrawerOpen]);

  useEffect(() => {
    return () => setMobileFilterDrawerOpen(false);
  }, [setMobileFilterDrawerOpen]);

  return (
    <Box className={`mobile-name-filters ${appliedFilterChips.length > 0 ? 'mobile-name-filters--has-chips' : ''}`}>
      {appliedFilterChips.length > 0 && (
        <Box className="mobile-name-filters-chips themed-scrollbar" aria-label="Applied filters">
          {appliedFilterChips.map((chip) => (
            <WorkspaceAppliedFilterChip key={chip.id} label={chip.label} onDelete={chip.onDelete} />
          ))}
        </Box>
      )}
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
            <SecondaryButton key={category.id} text={category.buttonLabel} disabled={isLoading} onClick={() => setOpenCategory(category)} />
          ))}
        </Box>
      </TutorialTooltip>
      <MobileFilterDrawer category={openCategory} onClose={() => setOpenCategory(null)} />
    </Box>
  );
};
