import type { GivenName } from '@/api/generated';
import ExhaustedNameMessage from '@/components/NameGenerator/NameEvaluator/ExhaustedNameMessage/ExhaustedNameMessage';
import NameLimitMessage from '@/components/NameGenerator/NameEvaluator/NameLimitMessage/NameLimitMessage';
import CandidateErrorMessage from '@/components/NameGenerator/NameEvaluator/CandidateErrorMessage/CandidateErrorMessage';
import GeneratedNameSkeleton from '@/components/NameGenerator/GeneratedNameSkeleton/GeneratedNameSkeleton';
import BareIconButton from '@/components/Shared/BareIconButton/BareIconButton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import NameEtymologyModal from '@/components/Shared/NameEtymologyModal/NameEtymologyModal';
import { Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
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
  const [etymologyOpen, setEtymologyOpen] = useState(false);

  // Ahead of the skeleton, because a failed fetch leaves the exact state the
  // skeleton reads as "still loading": no candidate, and nothing having come
  // back empty to mark the pool spent. Without this branch it shimmers forever.
  //
  // Already withheld by NameEvaluator while a candidate is in hand, so this only
  // has to decide the order.
  const slotState = atApprovedNameLimit
    ? 'limit'
    : candidateErrorMessage
      ? 'error'
      : isAwaitingCandidates
        ? 'skeleton'
        : currentCandidate
          ? 'name'
          : 'exhausted';

  return (
    <div className="evaluated-name-display">
      <div className="evaluated-name-display-slot">
        {/* A plain fade between states, one leaving before the next arrives, so
            a message never overlaps a name. Keyed on the kind of state rather
            than the candidate: one name replacing another stays inside 'name'
            and keeps its own drop below. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slotState}
            className="evaluated-name-display-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.durationSeconds[180], ease: motionTokens.ease.out }}
          >
            {slotState === 'limit' ? (
              <NameLimitMessage />
            ) : slotState === 'error' && candidateErrorMessage ? (
              <CandidateErrorMessage message={candidateErrorMessage} />
            ) : slotState === 'skeleton' ? (
              <GeneratedNameSkeleton />
            ) : slotState === 'name' && currentCandidate ? (
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
                  {/* Hugs the name so the info button can hang off its right edge
                      without moving the name off centre. Inside the motion block so
                      the button arrives and leaves with its name. */}
                  <span className="evaluated-name-display-name-row">
                    <TutorialTooltip title="Do you like this name?" placement="top">
                      <Typography variant="h2" className="evaluated-name-display-name">
                        {currentCandidate.givenName}
                      </Typography>
                    </TutorialTooltip>
                    {currentCandidate.etymology ? (
                      <span className="evaluated-name-display-info-anchor">
                        <TutorialTooltip title="Learn about this name's origin" placement="right">
                          <BareIconButton
                            icon={<InfoOutlinedIcon />}
                            label={`About ${currentCandidate.givenName}`}
                            onClick={() => setEtymologyOpen(true)}
                            size="large"
                            tone="action"
                          />
                        </TutorialTooltip>
                      </span>
                    ) : null}
                  </span>
                </motion.div>
              </AnimatePresence>
            ) : (
              <ExhaustedNameMessage />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Outside the motion block, so the modal is not unmounted by the name's
          exit animation. The rating buttons are behind it while it is open, so
          the candidate cannot change underneath it. */}
      {currentCandidate?.etymology ? (
        <NameEtymologyModal
          open={etymologyOpen}
          onClose={() => setEtymologyOpen(false)}
          givenName={currentCandidate.givenName}
          etymology={currentCandidate.etymology}
        />
      ) : null}
    </div>
  );
};
