import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import './NameListActions.css';

type Props = {
  canCompareNames: boolean;
  onCompareNamesClick: () => void;
};

export default ({ canCompareNames, onCompareNamesClick }: Props) => {
  return (
    <Box className="name-list-actions">
      <Tooltip title={canCompareNames ? '' : 'Add at least two names to compare.'}>
        <span className="name-list-actions-tooltip-target">
          <PrimaryButton text="Compare Names" disabled={!canCompareNames} onClick={onCompareNamesClick} size="wide" />
        </span>
      </Tooltip>
    </Box>
  );
};
