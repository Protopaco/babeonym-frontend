import Box from '@mui/material/Box';
import { AnimatePresence, motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import { useCompareNamePair } from '@/components/CompareNames/useCompareNamePair';
import CompareNameChip from '@/components/CompareNames/CompareNameChip/CompareNameChip';
import { Typography } from '@mui/material';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import { useUser } from '@/state/user/user.context';
import './CompareNamesMode.css';
import NameChipSkeleton from '@/components/Shared/NameChipSkeleton/NameChipSkeleton';
import { useCompareNameVoting } from '@/components/CompareNames/useCompareNameVoting';

// Travel stays component-owned: it scales with the size of the thing moving,
// which the token module deliberately does not try to standardize.
const SLOT_TRAVEL_PX = 88;

// A pair drops in from above, matching the generator, and leaves outwards — the
// left name to the left, the right name to the right — so the two separate
// rather than one dropping down across the surname beneath it.
//
// Which way a chip leaves is a property of the slot it sits in, not of the vote,
// so it needs nothing carried through AnimatePresence's `custom`. That is why
// nothing here tracks which side was picked.
const slotVariantsForSide = (side: 'left' | 'right') => ({
  initial: { opacity: 0, y: -SLOT_TRAVEL_PX },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: side === 'left' ? -SLOT_TRAVEL_PX : SLOT_TRAVEL_PX },
});

const leftSlotVariants = slotVariantsForSide('left');
const rightSlotVariants = slotVariantsForSide('right');

const CompareNamesMode = () => {
  const { state } = useGivenNames();
  const { state: userState } = useUser();
  const { user } = userState;
  const { approvedGivenNames, givenNameProviderLoaded } = state;
  const { currentPair, advancePair } = useCompareNamePair(approvedGivenNames, givenNameProviderLoaded);
  const { voteForName } = useCompareNameVoting(currentPair, advancePair);

  const slotTransition = { duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.out } as const;

  // Both slots are keyed on the pair, not on one name, so a name that happens to
  // carry over into the next pair still animates with its partner.
  const pairKey = currentPair ? `${currentPair.left.givenCustomNameBridgeId}:${currentPair.right.givenCustomNameBridgeId}` : '';

  // Under each chip rather than once beneath the pair, so each option reads as
  // a whole name — which is most of what the comparison is for. Deliberately
  // outside the animating element: the surname is the same on both sides and
  // does not change between pairs, so travelling with the chip on every vote
  // would be motion with nothing behind it.
  //
  // Rendered whether or not there is a surname to show. Its height is reserved
  // either way, so the pair sits in the same place for every user and does not
  // jump when a surname is set in Settings.
  const surname = <Typography className="compare-names-mode-surname">{user?.surName ?? ''}</Typography>;

  return (
    <Box className="compare-names-mode-content">
      {currentPair && currentPair.left && currentPair.right ? (
        <>
          <div className="compare-names-mode-slot">
            <div className="compare-names-mode-chip-area">
              <AnimatePresence initial={false}>
                <motion.div
                  key={pairKey}
                  className="compare-names-mode-motion"
                  variants={leftSlotVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={slotTransition}
                >
                  <CompareNameChip name={currentPair.left} onVote={voteForName} />
                </motion.div>
              </AnimatePresence>
            </div>
            {surname}
          </div>
          <Typography className="compare-names-content-or">OR</Typography>
          <div className="compare-names-mode-slot">
            <div className="compare-names-mode-chip-area">
              <AnimatePresence initial={false}>
                <motion.div
                  key={pairKey}
                  className="compare-names-mode-motion"
                  variants={rightSlotVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={slotTransition}
                >
                  <CompareNameChip name={currentPair.right} onVote={voteForName} />
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
