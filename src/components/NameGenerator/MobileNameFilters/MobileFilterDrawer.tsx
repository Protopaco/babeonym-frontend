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

  // What the drawer shows, which outlives `category` by the length of the
  // closing slide: the parent clears `category` the moment the drawer closes, and
  // without this the sheet would go blank on its way down. Updated during render
  // rather than in an effect so a newly opened category is never a frame behind.
  // Never cleared — once the slide finishes MUI unmounts the content, so the
  // last category simply goes unseen.
  const [displayedCategory, setDisplayedCategory] = useState(category);
  if (category && category !== displayedCategory) {
    setDisplayedCategory(category);
  }

  // Taps are a draft until Set Filters, so opening seeds from what is applied.
  // Closing without committing leaves the applied set untouched. Keyed on
  // `category` rather than what is displayed, so it seeds on open and does not
  // reseed during the closing slide.
  useEffect(() => {
    if (!category) return;
    setDraftOptionIds(parseFilterIds(searchParams, category.paramKey));
  }, [category]);

  const commitFilters = () => {
    if (!displayedCategory) return;

    const nextParams = new URLSearchParams(searchParams);
    writeFilterIds(nextParams, displayedCategory.paramKey, draftOptionIds);
    setSearchParams(nextParams, { replace: true });
    onClose();
  };

  // Rendered whether or not a category is open. MUI skips the opening slide for
  // a Drawer that mounts already open, and an unmounted one has no closing slide
  // to run, so the Drawer has to exist before it opens and after it closes.
  return (
    <Drawer
      anchor="bottom"
      open={category !== null}
      onClose={onClose}
      className="mobile-filter-drawer"
      PaperProps={{ className: 'mobile-filter-drawer-paper' }}
    >
      {displayedCategory ? (
        <Box className="mobile-filter-drawer-content">
          <Box className="mobile-filter-drawer-header">
            <MobileSectionHeader title={displayedCategory.drawerTitle} />
            <IconButton className="mobile-filter-drawer-close" aria-label={`Close ${displayedCategory.drawerTitle} filter`} onClick={onClose}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
          <MobileFilterList
            options={nameFilters[displayedCategory.optionsKey]}
            searchId={`${displayedCategory.id}-filter-search`}
            searchable={displayedCategory.searchable}
            selectedOptionIds={draftOptionIds}
            onToggle={(optionId) =>
              setDraftOptionIds((currentDraft) =>
                currentDraft.includes(optionId) ? currentDraft.filter((draftId) => draftId !== optionId) : [...currentDraft, optionId]
              )
            }
          />
          {/* Clear All empties this category's draft and leaves what is applied
              alone, like desktop's Clear All beside Set Filters. Disabled rather
              than hidden when nothing is picked, so the row never shifts. Set
              Filters stays enabled: committing an empty draft is how a category
              is cleared. */}
          <Box className="mobile-filter-drawer-actions">
            <SecondaryButton text="Clear All" onClick={() => setDraftOptionIds([])} disabled={draftOptionIds.length === 0} />
            <SecondaryButton text="Set Filters" onClick={commitFilters} />
          </Box>
        </Box>
      ) : null}
    </Drawer>
  );
};

export default MobileFilterDrawer;
