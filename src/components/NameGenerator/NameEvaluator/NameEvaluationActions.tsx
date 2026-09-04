import BedtimeIcon from '@mui/icons-material/Bedtime';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Box from '@mui/material/Box';
import PrimaryIconButton from '@/components/Shared/PrimaryIconButton/PrimaryIconButton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './NameEvaluationActions.css';

type Props = {
  approveClick: () => void;
  disabled: boolean;
  rejectClick: () => void;
  snoozeClick: () => void;
};

export default ({ approveClick, disabled, rejectClick, snoozeClick }: Props) => {
  return (
    <Box className="name-evaluation-actions">
      <PrimaryIconButton icon={<ThumbUpIcon />} label="Approve name" onClick={approveClick} disabled={disabled} />
      <TutorialTooltip title="Skip this name for now" placement="top">
        <PrimaryIconButton icon={<BedtimeIcon />} label="Snooze name" onClick={snoozeClick} disabled={disabled} />
      </TutorialTooltip>
      <PrimaryIconButton icon={<ThumbDownIcon />} label="Reject name" onClick={rejectClick} disabled={disabled} />
    </Box>
  );
};
