import { useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import type { GivenName } from '@/api/generated';
import { useCompareNamePair } from '@/components/CompareNames/useCompareNamePair';
import CompareNameChip from '@/components/CompareNames/CompareNameChip/CompareNameChip';
import { Typography } from '@mui/material';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import { useUser } from '@/state/user/user.context';
import './CompareNamesMode.css';
import NameChipSkeleton from '@/components/Shared/NameChipSkeleton/NameChipSkeleton';
import { useCompareNameVoting } from '@/components/CompareNames/useCompareNameVoting';

type VotedSide = 'left' | 'right' | null;

// Travel stays component-owned: it scales with the size of the thing moving,
// which the token module deliberately does not try to standardize.
const SLOT_TRAVEL_PX = 88;

const CompareNamesMode = () => {
  const { state } = useGivenNames();
  const { state: userState } = useUser();
  const { user } = userState;
  const { approvedGivenNames, givenNameProviderLoaded } = state;
  const { currentPair, advancePair } = useCompareNamePair(approvedGivenNames, givenNameProviderLoaded);
  const { voteForName } = useCompareNameVoting(currentPair, advancePair);
  const [votedSide, setVotedSide] = useState<VotedSide>(null);

  const slotVariants = {
    initial: { opacity: 0, y: SLOT_TRAVEL_PX },
    animate: { opacity: 1, y: 0 },
    // The winner leaves upward and the loser downward, so the exit itself says
    // which name was picked. Read through AnimatePresence's `custom`, because an
    // exiting element otherwise keeps the props it held before the click.
    exit: (wasVoted: boolean) => ({ opacity: 0, y: wasVoted ? -SLOT_TRAVEL_PX : SLOT_TRAVEL_PX }),
  };

  const slotTransition = { duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.out } as const;

  const vote = (side: Exclude<VotedSide, null>) => (name: GivenName) => {
    setVotedSide(side);
    voteForName(name);
  };

  // Both slots are keyed on the pair, not on one name, so a name that happens to
  // carry over into the next pair still animates with its partner.
  const pairKey = currentPair ? `${currentPair.left.givenCustomNameBridgeId}:${currentPair.right.givenCustomNameBridgeId}` : '';

  // Under each chip rather than once beneath the pair, so each option reads as
  // a whole name — which is most of what the comparison is for. Deliberately
  // outside the animating element: the surname is the same on both sides and
  // does not change between pairs, so travelling with the chip on every vote
  // would be motion with nothing behind it.
  const surname = user?.surName ? <Typography className="compare-names-mode-surname">{user.surName}</Typography> : null;

  return (
    <Box className="compare-names-mode-content">
      {currentPair && currentPair.left && currentPair.right ? (
        <>
          <div className="compare-names-mode-slot">
            <div className="compare-names-mode-chip-area">
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
                  <CompareNameChip name={currentPair.left} onVote={vote('left')} />
                </motion.div>
              </AnimatePresence>
            </div>
            {surname}
          </div>
          <Typography className="compare-names-content-or">OR</Typography>
          <div className="compare-names-mode-slot">
            <div className="compare-names-mode-chip-area">
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
                  <CompareNameChip name={currentPair.right} onVote={vote('right')} />
                </motion.div>
              </AnimatePresence>
            </div>
            {surname}
          </div>
        </>
      ) : (
        <>
          <div className="compare-names-mode-slot">
            <div className="compare-names-mode-chip-area">
              <NameChipSkeleton size="compare" />
            </div>
            {surname}
          </div>
          <Typography className="compare-names-content-or">OR</Typography>
          <div className="compare-names-mode-slot">
            <div className="compare-names-mode-chip-area">
              <NameChipSkeleton size="compare" />
            </div>
            {surname}
          </div>
        </>
      )}
    </Box>
  );
};

export default CompareNamesMode;
