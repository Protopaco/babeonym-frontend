import { useGivenNames } from '@/state/givenName/givenName.provider';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/NameEvaluator/NameEvaluator.css';
import { Typography } from '@mui/material';
import { useUser } from '@/state/user/user.context';
import EvaluatedNameDisplay from '@/components/NameGenerator/NameEvaluator/EvaluatedNameDisplay';
import NameEvaluationActions from '@/components/NameGenerator/NameEvaluator/NameEvaluationActions';
import { useNameEvaluationActions } from '@/components/NameGenerator/NameEvaluator/useNameEvaluationActions';
import approvedGivenNameLimit from '@/utils/approvedGivenNameLimit';

export default () => {
  const givenNameContext = useGivenNames();
  const { state: userState } = useUser();
  const { user } = userState;
  const { givenNameCandidates, givenNameProviderLoaded, candidatesExhausted, approvedGivenNames } = givenNameContext.state;
  const currentCandidate = givenNameCandidates && givenNameCandidates.length > 0 ? givenNameCandidates[0] : null;
  // Derived rather than held in state: it is a function of the approved list
  // and nothing else, so storing it would only give it a way to disagree.
  const atApprovedNameLimit = approvedGivenNames.length >= approvedGivenNameLimit;
  // An empty queue is only worth explaining once the pool is known to be spent.
  // Until then a request is still outstanding, so the skeleton is the honest
  // display. Derived here rather than in EvaluatedNameDisplay because the
  // surname beside it has to know the same thing, and two copies would drift.
  const isAwaitingCandidates = !givenNameProviderLoaded || (!currentCandidate && !candidatesExhausted);
  // The surname is a suffix to a first name, so it only makes sense while one
  // is on screen. Beside a message it reads as a stray word. The skeleton still
  // counts as a name — it stands in for one — so the row does not jump when the
  // name lands.
  const isMessageShowing = atApprovedNameLimit || (!isAwaitingCandidates && !currentCandidate);
  // Disabled as well as hidden. The queue still holds candidates at the cap, so
  // without this the buttons would act on a name that is no longer on screen.
  const actionDisabled = !givenNameProviderLoaded || !currentCandidate || atApprovedNameLimit;
  const { approveClick, rejectClick, snoozeClick } = useNameEvaluationActions(currentCandidate);

  return (
    <Box id="name-evaluator-content">
      <Box className="name-evaluator-display-row">
        <EvaluatedNameDisplay
          atApprovedNameLimit={atApprovedNameLimit}
          currentCandidate={currentCandidate}
          isAwaitingCandidates={isAwaitingCandidates}
        />
        {user?.surName && !isMessageShowing ? (
          <Typography variant="h3" id="user-surname">
            {user.surName}
          </Typography>
        ) : null}
      </Box>
      <Box className="name-evaluator-actions-row">
        <NameEvaluationActions approveClick={approveClick} disabled={actionDisabled} rejectClick={rejectClick} snoozeClick={snoozeClick} />
      </Box>
    </Box>
  );
};
