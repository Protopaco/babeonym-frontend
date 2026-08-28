import type { GivenName } from '@/api/generated';
import GeneratedNameSkeleton from '@/components/NameGenerator/GeneratedNameSkeleton/GeneratedNameSkeleton';
import MobileTutorialHint from '@/components/Shared/MobileTutorialHint/MobileTutorialHint';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import { Typography } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import './EvaluatedNameDisplay.css';

type Props = {
  currentCandidate: GivenName | null;
  givenNameProviderLoaded: boolean;
};

export default ({ currentCandidate, givenNameProviderLoaded }: Props) => {
  return (
    <div className="evaluated-name-display">
      <MobileTutorialHint text="Do you like this name?" />
      <div className="evaluated-name-display-slot">
        {givenNameProviderLoaded ? (
          <AnimatePresence initial={false}>
            <motion.div
              key={currentCandidate?.givenCustomNameBridgeId ?? 'no-names'}
              className="evaluated-name-display-motion"
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -42 }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
            >
              <TutorialTooltip title="Do you like this name?" placement="top">
                <Typography variant="h2" className="evaluated-name-display-name">
                  {currentCandidate ? currentCandidate.givenName : 'no names'}
                </Typography>
              </TutorialTooltip>
            </motion.div>
          </AnimatePresence>
        ) : (
          <GeneratedNameSkeleton />
        )}
      </div>
    </div>
  );
};
