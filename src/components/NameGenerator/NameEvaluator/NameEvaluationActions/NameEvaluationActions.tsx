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
      {/* Save, later, never — one voice across the three, and the two that get
          confused share a construction so the difference between them is the
          words "later" and "Don't" rather than a tone. The moon in particular
          says nothing on its own about the name coming back. */}
      <TutorialTooltip title="Save this name" placement="top">
        <PrimaryIconButton icon={<ThumbUpIcon />} label="Approve name" onClick={approveClick} disabled={disabled} />
      </TutorialTooltip>
      <TutorialTooltip title="Show it again later" placement="top">
        <PrimaryIconButton icon={<BedtimeIcon />} label="Snooze name" onClick={snoozeClick} disabled={disabled} />
      </TutorialTooltip>
      <TutorialTooltip title="Don't show it again" placement="top">
        <PrimaryIconButton icon={<ThumbDownIcon />} label="Reject name" onClick={rejectClick} disabled={disabled} />
      </TutorialTooltip>
    </Box>
  );
};
