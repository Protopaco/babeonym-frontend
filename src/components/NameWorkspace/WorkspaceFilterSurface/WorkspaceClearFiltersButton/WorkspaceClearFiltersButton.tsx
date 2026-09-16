import { useEffect, useState } from 'react';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import './WorkspaceClearFiltersButton.css';

// Long enough to find the button again after the label appears, short enough
// that a stray first tap is forgotten before it can surprise anyone.
const CONFIRMATION_TIMEOUT_MILLISECONDS = 3000;

type Props = {
  onClearFilters: () => void;
  // Hidden where the row is too narrow for the label, such as the mobile tray.
  // The icon alone keeps an accessible name.
  labelVisibility?: 'visible' | 'hidden';
};

// The right-hand end of the filter row, opposite the Filters toggle. The chips
// between them scroll, so the two ends are what give that strip a boundary —
// without this the row simply runs off the edge.
const WorkspaceClearFiltersButton = ({ onClearFilters, labelVisibility = 'visible' }: Props) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isConfirming) return;
    const timeoutId = window.setTimeout(() => setIsConfirming(false), CONFIRMATION_TIMEOUT_MILLISECONDS);
    return () => window.clearTimeout(timeoutId);
  }, [isConfirming]);

  // A lone icon at the edge of a scrolling row is easy to hit by accident, so
  // the first tap only asks, by showing the label, and the second clears.
  const handleIconOnlyClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    setIsConfirming(false);
    onClearFilters();
  };

  return (
    <div className="workspace-clear-filters-button">
      {labelVisibility === 'hidden' ? (
        <Button
          className={`workspace-clear-filters-button-confirm ${isConfirming ? 'workspace-clear-filters-button-confirm--confirming' : ''}`}
          onClick={handleIconOnlyClick}
          aria-label={isConfirming ? 'Confirm clear all filters' : 'Clear all filters'}
        >
          <FilterListOffIcon className="workspace-clear-filters-button-icon" fontSize="small" />
          {/* Width rather than a layout animation: the button really grows, so
              the chip row beside it gives way smoothly and the icon and text are
              never scaled. MotionConfig covers the slide under reduced motion,
              but width is not a transform, so it is turned off here. */}
          <AnimatePresence initial={false}>
            {isConfirming && (
              <motion.span
                className="workspace-clear-filters-button-confirm-label"
                initial={{ width: 0, opacity: 0, x: 4 }}
                animate={{ width: 'auto', opacity: 1, x: 0 }}
                exit={{ width: 0, opacity: 0, x: 4 }}
                transition={{
                  width: { duration: shouldReduceMotion ? 0 : motionTokens.durationSeconds[180], ease: motionTokens.ease.out },
                  x: { duration: motionTokens.durationSeconds[180], ease: motionTokens.ease.out },
                  opacity: { duration: motionTokens.durationSeconds[120], ease: motionTokens.ease.out },
                }}
              >
                <Typography className="workspace-clear-filters-button-label">Clear All?</Typography>
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      ) : (
        <Button onClick={onClearFilters} startIcon={<FilterListOffIcon className="workspace-clear-filters-button-icon" fontSize="small" />}>
          <Typography className="workspace-clear-filters-button-label">Clear All</Typography>
        </Button>
      )}
    </div>
  );
};

export default WorkspaceClearFiltersButton;
