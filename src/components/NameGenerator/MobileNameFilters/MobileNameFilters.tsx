import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import MobileFilterDrawer from '@/components/NameGenerator/MobileNameFilters/MobileFilterDrawer';
import { mobileFilterCategories } from '@/components/NameGenerator/MobileNameFilters/mobileFilterCategories';
import type { MobileFilterCategory } from '@/components/NameGenerator/MobileNameFilters/mobileFilterCategories';
import { useMobileAppliedFilterChips } from '@/components/NameGenerator/MobileNameFilters/useMobileAppliedFilterChips';
import { useAppLayoutState } from '@/state/appLayoutState/appLayoutState.context';
import './MobileNameFilters.css';

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
      <Box className="mobile-name-filters-triggers">
        {mobileFilterCategories.map((category) => (
          <SecondaryButton
            key={category.id}
            text={category.buttonLabel}
            disabled={isLoading}
            onClick={() => setOpenCategory(category)}
          />
        ))}
      </Box>
      <MobileFilterDrawer category={openCategory} onClose={() => setOpenCategory(null)} />
    </Box>
  );
};
