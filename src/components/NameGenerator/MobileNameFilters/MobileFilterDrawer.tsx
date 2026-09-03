import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSearchParams } from 'react-router-dom';
import MobileFilterList from '@/components/NameGenerator/MobileFilterList/MobileFilterList';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import type { MobileFilterCategory } from '@/components/NameGenerator/MobileNameFilters/mobileFilterCategories';
import { useFilters } from '@/state/filter/filter.context';
import { parseFilterIds } from '@/utils/parseFilterIds';
import { writeFilterIds } from '@/components/NameWorkspace/WorkspaceFilterSurface/writeFilterIds';
import './MobileFilterDrawer.css';

type Props = {
  category: MobileFilterCategory | null;
  onClose: () => void;
};

const MobileFilterDrawer = ({ category, onClose }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    state: { nameFilters },
  } = useFilters();
  const [draftOptionIds, setDraftOptionIds] = useState<number[]>([]);

  // Taps are a draft until Set Filters, so opening seeds from what is applied.
  // Closing without committing leaves the applied set untouched.
  useEffect(() => {
    if (!category) return;
    setDraftOptionIds(parseFilterIds(searchParams, category.paramKey));
  }, [category]);

  if (!category) return null;

  const commitFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    writeFilterIds(nextParams, category.paramKey, draftOptionIds);
    setSearchParams(nextParams, { replace: true });
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={true}
      onClose={onClose}
      className="mobile-filter-drawer"
      PaperProps={{ className: 'mobile-filter-drawer-paper' }}
    >
      <Box className="mobile-filter-drawer-content">
        <Box className="mobile-filter-drawer-header">
          <MobileSectionHeader title={category.drawerTitle} />
          <IconButton className="mobile-filter-drawer-close" aria-label={`Close ${category.drawerTitle} filter`} onClick={onClose}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
        <MobileFilterList
          options={nameFilters[category.optionsKey]}
          searchId={`${category.id}-filter-search`}
          searchable={category.searchable}
          selectedOptionIds={draftOptionIds}
          onToggle={(optionId) =>
            setDraftOptionIds((currentDraft) =>
              currentDraft.includes(optionId) ? currentDraft.filter((draftId) => draftId !== optionId) : [...currentDraft, optionId]
            )
          }
          onUnselectAll={() => setDraftOptionIds([])}
        />
        <Box className="mobile-filter-drawer-actions">
          <SecondaryButton text="Set Filters" onClick={commitFilters} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileFilterDrawer;
