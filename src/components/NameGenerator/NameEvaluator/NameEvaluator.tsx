import { useGivenNames } from '@/state/givenName/givenName.provider';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/NameEvaluator/NameEvaluator.css';
import { Typography } from '@mui/material';
import { useUser } from '@/state/user/user.context';
import EvaluatedNameDisplay from '@/components/NameGenerator/NameEvaluator/EvaluatedNameDisplay';
import MobileNameEvaluationActions from '@/components/NameGenerator/NameEvaluator/MobileNameEvaluationActions';
import NameEvaluationActions from '@/components/NameGenerator/NameEvaluator/NameEvaluationActions';
import { useNameEvaluationActions } from '@/components/NameGenerator/NameEvaluator/useNameEvaluationActions';

export default () => {
  const givenNameContext = useGivenNames();
  const { state: userState } = useUser();
  const { user } = userState;
  const { givenNameCandidates, givenNameProviderLoaded } = givenNameContext.state;
  const currentCandidate = givenNameCandidates && givenNameCandidates.length > 0 ? givenNameCandidates[0] : null;
  const actionDisabled = !givenNameProviderLoaded || !currentCandidate;
  const { approveClick, rejectClick, snoozeClick } = useNameEvaluationActions(currentCandidate);

  return (
    <Box id="name-evaluator-content">
      <Box className="name-evaluator-display-row">
        <EvaluatedNameDisplay currentCandidate={currentCandidate} givenNameProviderLoaded={givenNameProviderLoaded} />
        {user?.surName ? (
          <Typography variant="h3" id="user-surname">
            {user.surName}
          </Typography>
        ) : null}
      </Box>
      <Box className="name-evaluator-actions-row">
        <NameEvaluationActions approveClick={approveClick} disabled={actionDisabled} rejectClick={rejectClick} snoozeClick={snoozeClick} />
        <MobileNameEvaluationActions approveClick={approveClick} disabled={actionDisabled} rejectClick={rejectClick} snoozeClick={snoozeClick} />
      </Box>
    </Box>
  );
};
