import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import IconButton from '@mui/material/IconButton';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useTutorial } from '@/state/tutorial/tutorial.context';
import '@/components/Header/TopBar/MobileTutorialToggle.css';

/* Long enough to read four syllables and look at what they point to, short
   enough that the label is gone before it becomes furniture. */
const TUTORIAL_LABEL_VISIBLE_MS = 6000;

export default () => {
  const { tutorialEnabled, toggleTutorialEnabled, tutorialLabelDismissed, dismissTutorialLabel } = useTutorial();

  const tutorialLabelVisible = !tutorialEnabled && !tutorialLabelDismissed;

  /* The timer is the only thing that retires the label. Tapping the icon would
     do it too, but a user who never taps is exactly the one it stays parked in
     front of. */
  useEffect(() => {
    if (!tutorialLabelVisible) {
      return;
    }

    const timeoutId = window.setTimeout(dismissTutorialLabel, TUTORIAL_LABEL_VISIBLE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [tutorialLabelVisible, dismissTutorialLabel]);

  return (
    <div id="mobile-tutorial-toggle">
      <IconButton
        id="mobile-tutorial-button"
        aria-label={tutorialEnabled ? 'Turn off tutorial help' : 'Turn on tutorial help'}
        aria-pressed={tutorialEnabled}
        data-tutorial-enabled={tutorialEnabled}
        onClick={toggleTutorialEnabled}
      >
        {/* A question mark rather than the baby the desktop icon uses: the
            wordmark beside it already carries that face as its O, and two of
            them in one bar read as a mistake. */}
        <QuestionMarkIcon aria-hidden="true" focusable="false" />
      </IconButton>
      {/* Fades rather than vanishing, so a label leaving on a timer reads as
          finishing rather than as something breaking. It starts at full
          opacity: it is on screen from the first paint, so there is nothing to
          fade in from. */}
      <AnimatePresence initial={false}>
        {tutorialLabelVisible ? (
          <motion.div className="mobile-tutorial-toggle-label" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            Questions?
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
