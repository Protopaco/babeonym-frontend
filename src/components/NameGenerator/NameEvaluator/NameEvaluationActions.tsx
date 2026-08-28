import Box from '@mui/material/Box';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
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
      <PrimaryButton onClick={approveClick} text="Approve" disabled={disabled} />
      <TutorialTooltip title="Skip this name for now" placement="top">
        <PrimaryButton onClick={snoozeClick} text="Snooze" disabled={disabled} />
      </TutorialTooltip>
      <PrimaryButton onClick={rejectClick} text="Reject" disabled={disabled} />
    </Box>
  );
};
