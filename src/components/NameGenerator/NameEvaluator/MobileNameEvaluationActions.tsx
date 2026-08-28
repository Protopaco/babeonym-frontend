import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
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
        <ThumbUpOutlinedIcon />
      </IconButton>
      <IconButton className="mobile-name-evaluation-action-button" onClick={snoozeClick} disabled={disabled} aria-label="Snooze name">
        <BedtimeOutlinedIcon />
      </IconButton>
      <IconButton className="mobile-name-evaluation-action-button" onClick={rejectClick} disabled={disabled} aria-label="Reject name">
        <ThumbDownOutlinedIcon />
      </IconButton>
    </Box>
  );
};
