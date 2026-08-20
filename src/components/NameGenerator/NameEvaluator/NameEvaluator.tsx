import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/NameEvaluator/NameEvaluator.css';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import { Typography } from '@mui/material';
import { useUser } from '@/state/user/user.context';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import IconButton from '@mui/material/IconButton';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

type Props = {
  drawerOpen: boolean;
};

export default ({ drawerOpen }: Props) => {
  const givenNameContext = useGivenNames();
  const { state: userState } = useUser();
  const { user } = userState;
  const { givenNameCandidates } = givenNameContext.state;
  const { approveCandidate, rejectCandidate, snoozeCandidate } = useGivenNamesActions();

  const approveClick = async () => {
    if (givenNameCandidates && givenNameCandidates.length > 0) {
      await approveCandidate(givenNameCandidates[0].givenCustomNameBridgeId);
    }
  };

  const rejectClick = async () => {
    if (givenNameCandidates && givenNameCandidates.length > 0) {
      await rejectCandidate(givenNameCandidates[0].givenCustomNameBridgeId);
    }
  };

  const snoozeClick = async () => {
    if (givenNameCandidates && givenNameCandidates.length > 0) {
      await snoozeCandidate(givenNameCandidates[0].givenCustomNameBridgeId);
    }
  };

  return (
    <Box id="name-evaluator" className={drawerOpen ? 'drawer-open' : 'drawer-closed'}>
      <Box id="name-evaluator-column">
        <Box id="name-evaluator-header">
          <SectionHeader title="Name Generator" width="medium" />
        </Box>
        <Box id="name-evaluator-content">
          <Typography variant="h2" id="evaluated-name">
            {givenNameCandidates && givenNameCandidates.length > 0 ? givenNameCandidates[0].givenName : 'no names'}
          </Typography>
          {user?.surName ? (
            <Typography variant="h3" id="user-surname">
              {user.surName}
            </Typography>
          ) : null}
          <Box id="name-evaluator-button-container">
            <PrimaryButton onClick={approveClick} text="Approve" />
            <PrimaryButton onClick={snoozeClick} text="Snooze" />
            <PrimaryButton onClick={rejectClick} text="Reject" />
          </Box>
          <Box id="name-evaluator-mobile-button-container">
            <IconButton className="name-evaluator-mobile-action-button" onClick={approveClick} aria-label="Approve name">
              <ThumbUpOutlinedIcon />
            </IconButton>
            <IconButton className="name-evaluator-mobile-action-button" onClick={snoozeClick} aria-label="Snooze name">
              <BedtimeOutlinedIcon />
            </IconButton>
            <IconButton className="name-evaluator-mobile-action-button" onClick={rejectClick} aria-label="Reject name">
              <ThumbDownOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
