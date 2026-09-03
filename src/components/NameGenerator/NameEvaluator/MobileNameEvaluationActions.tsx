import BedtimeIcon from '@mui/icons-material/Bedtime';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import './MobileNameEvaluationActions.css';

type Props = {
  approveClick: () => void;
  disabled: boolean;
  rejectClick: () => void;
  snoozeClick: () => void;
};

export default ({ approveClick, disabled, rejectClick, snoozeClick }: Props) => {
  return (
    <Box className="mobile-name-evaluation-actions">
      <IconButton className="mobile-name-evaluation-action-button" onClick={approveClick} disabled={disabled} aria-label="Approve name">
        <ThumbUpIcon />
      </IconButton>
      <IconButton className="mobile-name-evaluation-action-button" onClick={snoozeClick} disabled={disabled} aria-label="Snooze name">
        <BedtimeIcon />
      </IconButton>
      <IconButton className="mobile-name-evaluation-action-button" onClick={rejectClick} disabled={disabled} aria-label="Reject name">
        <ThumbDownIcon />
      </IconButton>
    </Box>
  );
};
