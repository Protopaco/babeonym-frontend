import { useEffect, useState } from 'react';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import './WorkspaceClearFiltersButton.css';

// Long enough to find the button again after the label appears, short enough
// that a stray first tap is forgotten before it can surprise anyone.
const CONFIRMATION_TIMEOUT_MILLISECONDS = 3000;

type Props = {
  onClearFilters: () => void;
};

// The right-hand end of the filter row, opposite the Filters toggle. The chips
// between them scroll, so the two ends are what give that strip a boundary —
// without this the row simply runs off the edge.
const WorkspaceClearFiltersButton = ({ onClearFilters }: Props) => {
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!isConfirming) return;
    const timeoutId = window.setTimeout(() => setIsConfirming(false), CONFIRMATION_TIMEOUT_MILLISECONDS);
    return () => window.clearTimeout(timeoutId);
  }, [isConfirming]);

  // A lone icon at the edge of a scrolling row is easy to hit by accident, so
  // the first tap only asks, by showing the label, and the second clears.
  const handleClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    setIsConfirming(false);
    onClearFilters();
  };

  return (
    <div className="workspace-clear-filters-button">
      <PrimaryTextButton
        text="Clear All Filters"
        labelVisibility={isConfirming ? 'visible' : 'collapsed'}
        onClick={handleClick}
        size="compact-narrow"
        tone="action"
        startIcon={<FilterListOffIcon fontSize="small" color="action" />}
      />
    </div>
  );
};

export default WorkspaceClearFiltersButton;
