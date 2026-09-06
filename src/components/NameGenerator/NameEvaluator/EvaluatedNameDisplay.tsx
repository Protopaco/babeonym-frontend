import type { GivenName } from '@/api/generated';
import ExhaustedNameMessage from '@/components/NameGenerator/NameEvaluator/ExhaustedNameMessage';
import NameLimitMessage from '@/components/NameGenerator/NameEvaluator/NameLimitMessage';
import CandidateErrorMessage from '@/components/NameGenerator/NameEvaluator/CandidateErrorMessage';
import GeneratedNameSkeleton from '@/components/NameGenerator/GeneratedNameSkeleton/GeneratedNameSkeleton';
import MobileTutorialHint from '@/components/Shared/MobileTutorialHint/MobileTutorialHint';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import { Typography } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import './EvaluatedNameDisplay.css';

type Props = {
  currentCandidate: GivenName | null;
  isAwaitingCandidates: boolean;
  atApprovedNameLimit: boolean;
  candidateErrorMessage: string | null;
};

export default ({ currentCandidate, isAwaitingCandidates, atApprovedNameLimit, candidateErrorMessage }: Props) => {
  return (
    <div className="evaluated-name-display">
      {currentCandidate && !atApprovedNameLimit ? <MobileTutorialHint text="Do you like this name?" /> : null}
      <div className="evaluated-name-display-slot">
        {/* Ahead of the skeleton, because a failed fetch leaves the exact state
            the skeleton reads as "still loading": no candidate, and nothing
            having come back empty to mark the pool spent. Without this branch
            it shimmers forever.

            Already withheld by NameEvaluator while a candidate is in hand, so
            this only has to decide the order. */}
        {atApprovedNameLimit ? (
          <NameLimitMessage />
        ) : candidateErrorMessage ? (
          <CandidateErrorMessage message={candidateErrorMessage} />
        ) : isAwaitingCandidates ? (
          <GeneratedNameSkeleton />
        ) : currentCandidate ? (
          <AnimatePresence initial={false}>
            <motion.div
              key={currentCandidate.givenCustomNameBridgeId}
              className="evaluated-name-display-motion"
              // Drops in from above and leaves below, matching the direction a
              // compare pair arrives from. The two used to run opposite ways.
              initial={{ opacity: 0, y: -42 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 42 }}
              transition={{ duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.out }}
            >
              <TutorialTooltip title="Do you like this name?" placement="top">
                <Typography variant="h2" className="evaluated-name-display-name">
                  {currentCandidate.givenName}
                </Typography>
              </TutorialTooltip>
            </motion.div>
          </AnimatePresence>
        ) : (
          <ExhaustedNameMessage />
        )}
      </div>
    </div>
  );
};
