import { useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { GivenName } from '@/api/generated';
import { useCompareNamePair } from '@/components/CompareNames/useCompareNamePair';
import CompareNameButton from './CompareNameButton';
import { Typography } from '@mui/material';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import './CompareNamesMode.css';
import PrimaryButtonSkeleton from '../Shared/PrimaryButton/PrimaryButtonSkeleton';
import { useCompareNameVoting } from '@/components/CompareNames/useCompareNameVoting';

type VotedSide = 'left' | 'right' | null;

const SLOT_TRAVEL_PX = 88;
const SLOT_DURATION_SECONDS = 0.3;

const CompareNamesMode = () => {
  const { state } = useGivenNames();
  const { approvedGivenNames, givenNameProviderLoaded } = state;
  const { currentPair, advancePair } = useCompareNamePair(approvedGivenNames, givenNameProviderLoaded);
  const { voteForName } = useCompareNameVoting(currentPair, advancePair);
  const [votedSide, setVotedSide] = useState<VotedSide>(null);
  const shouldReduceMotion = useReducedMotion();

  const slotOffset = shouldReduceMotion ? 0 : SLOT_TRAVEL_PX;

  const slotVariants = {
    initial: { opacity: 0, y: slotOffset },
    animate: { opacity: 1, y: 0 },
    // The winner leaves upward and the loser downward, so the exit itself says
    // which name was picked. Read through AnimatePresence's `custom`, because an
    // exiting element otherwise keeps the props it held before the click.
    exit: (wasVoted: boolean) => ({ opacity: 0, y: wasVoted ? -slotOffset : slotOffset }),
  };

  const slotTransition = { duration: SLOT_DURATION_SECONDS, ease: 'easeOut' } as const;

  const vote = (side: Exclude<VotedSide, null>) => (name: GivenName) => {
    setVotedSide(side);
    voteForName(name);
  };

  // Both slots are keyed on the pair, not on one name, so a name that happens to
  // carry over into the next pair still animates with its partner.
  const pairKey = currentPair ? `${currentPair.left.givenCustomNameBridgeId}:${currentPair.right.givenCustomNameBridgeId}` : '';

  return (
    <Box className="compare-names-mode-content">
      {currentPair && currentPair.left && currentPair.right ? (
        <>
          <div className="compare-names-mode-slot">
            <AnimatePresence initial={false} custom={votedSide === 'left'}>
              <motion.div
                key={pairKey}
                className="compare-names-mode-motion"
                custom={votedSide === 'left'}
                variants={slotVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={slotTransition}
              >
                <CompareNameButton name={currentPair.left} onVote={vote('left')} />
              </motion.div>
            </AnimatePresence>
          </div>
          <Typography className="compare-names-content-or">OR</Typography>
          <div className="compare-names-mode-slot">
            <AnimatePresence initial={false} custom={votedSide === 'right'}>
              <motion.div
                key={pairKey}
                className="compare-names-mode-motion"
                custom={votedSide === 'right'}
                variants={slotVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={slotTransition}
              >
                <CompareNameButton name={currentPair.right} onVote={vote('right')} />
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      ) : (
        <>
          <PrimaryButtonSkeleton />
          <Typography className="compare-names-content-or">OR</Typography>
          <PrimaryButtonSkeleton />
        </>
      )}
    </Box>
  );
};

export default CompareNamesMode;
