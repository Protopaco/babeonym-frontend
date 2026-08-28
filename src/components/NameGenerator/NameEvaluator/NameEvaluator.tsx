import { useGivenNames } from '@/state/givenName/givenName.provider';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/NameEvaluator/NameEvaluator.css';
import { Typography } from '@mui/material';
import { useUser } from '@/state/user/user.context';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import { AnimatePresence, motion } from 'motion/react';
import GeneratedNameSkeleton from '@/components/NameGenerator/GeneratedNameSkeleton/GeneratedNameSkeleton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import MobileTutorialHint from '@/components/Shared/MobileTutorialHint/MobileTutorialHint';
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
          <Box id="evaluated-name-container">
            <MobileTutorialHint text="Do you like this name?" />
            <Box id="evaluated-name-slot">
              {givenNameProviderLoaded ? (
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentCandidate?.givenCustomNameBridgeId ?? 'no-names'}
                    className="evaluated-name-motion"
                    initial={{ opacity: 0, y: 42 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -42 }}
                    transition={{ duration: 0.26, ease: 'easeOut' }}
                  >
                    <TutorialTooltip title="Do you like this name?" placement="top">
                      <Typography variant="h2" id="evaluated-name">
                        {currentCandidate ? currentCandidate.givenName : 'no names'}
                      </Typography>
                    </TutorialTooltip>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <GeneratedNameSkeleton />
              )}
            </Box>
          </Box>
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
