import { useGivenNames } from '@/state/givenName/givenName.provider';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/NameEvaluator/NameEvaluator.css';
import { Typography } from '@mui/material';
import { useUser } from '@/state/user/user.context';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import EvaluatedNameDisplay from '@/components/NameGenerator/NameEvaluator/EvaluatedNameDisplay';
import MobileNameEvaluationActions from '@/components/NameGenerator/NameEvaluator/MobileNameEvaluationActions';
import NameEvaluationActions from '@/components/NameGenerator/NameEvaluator/NameEvaluationActions';
import { useNameEvaluationActions } from '@/components/NameGenerator/NameEvaluator/useNameEvaluationActions';

type Props = {
  drawerOpen: boolean;
};

export default ({ drawerOpen }: Props) => {
  const givenNameContext = useGivenNames();
  const { state: userState } = useUser();
  const { user } = userState;
  const { givenNameCandidates, givenNameProviderLoaded } = givenNameContext.state;
  const currentCandidate = givenNameCandidates && givenNameCandidates.length > 0 ? givenNameCandidates[0] : null;
  const actionDisabled = !givenNameProviderLoaded || !currentCandidate;
  const { approveClick, rejectClick, snoozeClick } = useNameEvaluationActions(currentCandidate);

  return (
    <Box id="name-evaluator" className={drawerOpen ? 'drawer-open' : 'drawer-closed'}>
      <Box id="name-evaluator-column">
        <Box id="name-evaluator-header">
          <SectionHeader title="Name Generator" width="medium" />
          <MobileSectionHeader title="Name Generator" />
        </Box>
        <Box id="name-evaluator-content">
          <EvaluatedNameDisplay currentCandidate={currentCandidate} givenNameProviderLoaded={givenNameProviderLoaded} />
          {user?.surName ? (
            <Typography variant="h3" id="user-surname">
              {user.surName}
            </Typography>
          ) : null}
          <NameEvaluationActions
            approveClick={approveClick}
            disabled={actionDisabled}
            rejectClick={rejectClick}
            snoozeClick={snoozeClick}
          />
          <MobileNameEvaluationActions
            approveClick={approveClick}
            disabled={actionDisabled}
            rejectClick={rejectClick}
            snoozeClick={snoozeClick}
          />
        </Box>
      </Box>
    </Box>
  );
};
