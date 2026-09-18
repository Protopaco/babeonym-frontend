import Box from '@mui/material/Box';
import { AnimatePresence, motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import { useCompareNamePair } from '@/components/CompareNamesMode/useCompareNamePair';
import CompareNameChip from '@/components/CompareNamesMode/CompareNameChip/CompareNameChip';
import { Typography } from '@mui/material';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import { useUser } from '@/state/user/user.context';
import './CompareNamesMode.css';
import NameChipSkeleton from '@/components/Shared/NameChipSkeleton/NameChipSkeleton';
import { useCompareNameVoting } from '@/components/CompareNamesMode/useCompareNameVoting';

// Travel stays component-owned: it scales with the size of the thing moving,
// which the token module deliberately does not try to standardize.
const SLOT_TRAVEL_PX = 42;

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
  // The tab is never gated, so this mode can be opened with nothing to compare.
  // Only once the names have loaded, so a slow load still shows skeletons.
  const hasTooFewNames = givenNameProviderLoaded && approvedGivenNames.length < 2;
  const { voteForName } = useCompareNameVoting(currentPair, advancePair);

  const slotTransition = { duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.out } as const;
  const contentFadeTransition = { duration: motionTokens.durationSeconds[180], ease: motionTokens.ease.out } as const;

  // Both slots are keyed on the pair, not on one name, so a name that happens to
  // carry over into the next pair still animates with its partner.
  const pairKey = currentPair ? `${currentPair.left.givenCustomNameBridgeId}:${currentPair.right.givenCustomNameBridgeId}` : '';

  // Under each chip rather than once beneath the pair, so each option reads as
  // a whole name — which is most of what the comparison is for. Deliberately
  // outside the animating element: the surname is the same on both sides and
  // does not change between pairs, so travelling with the chip on every vote
  // would be motion with nothing behind it. Always rendered, empty until the
  // user loads or for a user without one, so its fixed height is there from the
  // first frame and the pair does not jump up when the surname arrives.
  const surname = <Typography className="compare-names-mode-surname">{user?.surName}</Typography>;

  // The OR is built like a slot so the row can stay centred as a group and
  // still line the three items up on their names. It carries a hidden copy of
  // the surname, which makes its box exactly as tall as a real slot without
  // anything having to know how tall a surname is.
  const separator = (
    <div className="compare-names-mode-separator">
      <Typography className="compare-names-content-or">or</Typography>
      <div className="compare-names-mode-separator-spacer" aria-hidden="true">
        {surname}
      </div>
    </div>
  );

  return (
    <Box className="compare-names-mode">
      {/* Permanent rather than part of the tutorial. Nothing else on this
          screen says the chips are the answer to a question, and a mode that
          needs a prompt to be legible needs it whether or not help is on. */}
      <Typography className="compare-names-mode-prompt">
        {hasTooFewNames ? 'Save at least two names to start comparing' : 'Which do you prefer?'}
      </Typography>
      {/* A plain fade between the skeleton and the first pair, one leaving
          before the other arrives. Keyed on whether there is a pair rather than
          on the pair itself, so later pairs stay inside 'pair' and keep their
          own drop and part below. */}
      <AnimatePresence mode="wait" initial={false}>
        {currentPair && currentPair.left && currentPair.right ? (
          <motion.div
            key="pair"
            className="compare-names-mode-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={contentFadeTransition}
          >
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
            {separator}
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
          </motion.div>
        ) : hasTooFewNames ? null : (
          <motion.div
            key="skeleton"
            className="compare-names-mode-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={contentFadeTransition}
          >
            <div className="compare-names-mode-slot">
              <div className="compare-names-mode-chip-area">
                <NameChipSkeleton size="compare" />
              </div>
              {surname}
            </div>
            {separator}
            <div className="compare-names-mode-slot">
              <div className="compare-names-mode-chip-area">
                <NameChipSkeleton size="compare" />
              </div>
              {surname}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default CompareNamesMode;
