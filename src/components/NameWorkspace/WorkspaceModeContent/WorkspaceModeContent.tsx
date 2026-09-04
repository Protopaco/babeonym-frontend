import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import './WorkspaceModeContent.css';

type WorkspaceMode = 'add' | 'compare';

type Props = {
  mode: WorkspaceMode;
  children: ReactNode;
};

// Travel is a share of the pane's own width rather than a pixel count, so the
// content clears the frame at any width instead of stopping short on a wide
// screen.
const SLIDE_DISTANCE = '60%';

// Which way a pane moves is decided by the mode being switched *to*, not by the
// pane's own mode — otherwise the pane on its way out would still be reading
// the direction from when it was the current one, and both would travel the
// same way. Read through AnimatePresence's `custom`, which is how an exiting
// element is given a value newer than the props it holds.
const paneVariants = {
  initial: (incomingMode: WorkspaceMode) => ({
    opacity: 0,
    x: incomingMode === 'compare' ? SLIDE_DISTANCE : `-${SLIDE_DISTANCE}`,
  }),
  animate: { opacity: 1, x: 0 },
  exit: (incomingMode: WorkspaceMode) => ({
    opacity: 0,
    x: incomingMode === 'compare' ? `-${SLIDE_DISTANCE}` : SLIDE_DISTANCE,
  }),
};

// The two modes cross over rather than replacing each other: compare arrives
// from the right as the generator leaves to the left, and the reverse coming
// back, so the pair reads as one movement in a direction. `popLayout` is what
// allows it — it takes the leaving pane out of flow so both can occupy the
// frame at once, where the default would stack them and push the page around.
const WorkspaceModeContent = ({ mode, children }: Props) => (
  <section className="workspace-mode-content">
    <AnimatePresence mode="popLayout" initial={false} custom={mode}>
      <motion.div
        key={mode}
        custom={mode}
        className="workspace-mode-content-pane"
        variants={paneVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.out }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </section>
);

export default WorkspaceModeContent;
