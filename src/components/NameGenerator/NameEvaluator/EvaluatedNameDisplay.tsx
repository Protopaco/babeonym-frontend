import type { GivenName } from '@/api/generated';
import ExhaustedNameMessage from '@/components/NameGenerator/NameEvaluator/ExhaustedNameMessage';
import GeneratedNameSkeleton from '@/components/NameGenerator/GeneratedNameSkeleton/GeneratedNameSkeleton';
import MobileTutorialHint from '@/components/Shared/MobileTutorialHint/MobileTutorialHint';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import { Typography } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import './EvaluatedNameDisplay.css';

type Props = {
  currentCandidate: GivenName | null;
  givenNameProviderLoaded: boolean;
  candidatesExhausted: boolean;
};

export default ({ currentCandidate, givenNameProviderLoaded, candidatesExhausted }: Props) => {
  // An empty queue is only worth explaining once the pool is known to be spent.
  // Until then a request is still outstanding, so the skeleton is the honest
  // display.
  const isAwaitingCandidates = !givenNameProviderLoaded || (!currentCandidate && !candidatesExhausted);

  return (
    <div className="evaluated-name-display">
      {currentCandidate ? <MobileTutorialHint text="Do you like this name?" /> : null}
      <div className="evaluated-name-display-slot">
        {isAwaitingCandidates ? (
          <GeneratedNameSkeleton />
        ) : currentCandidate ? (
          <AnimatePresence initial={false}>
            <motion.div
              key={currentCandidate.givenCustomNameBridgeId}
              className="evaluated-name-display-motion"
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -42 }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
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
