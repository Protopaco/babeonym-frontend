import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { motion } from 'motion/react';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import motionTokens from '@/themes/motion.theme';
import './WorkspaceAddNameItem.css';

type Props = {
  onClick: () => void;
};

const WorkspaceAddNameItem = ({ onClick }: Props) => {
  return (
    // The mirror of the draft chip leaving: grows in from the scale it shrinks
    // to, anchored at the same left edge, so the button takes the slot as the
    // draft goes instead of popping in underneath it. Only runs when the draft
    // closes; the list's AnimatePresence skips it on first render.
    <motion.li
      className="workspace-add-name-item"
      style={{ originX: 0 }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: motionTokens.durationSeconds[180], ease: motionTokens.ease.out }}
    >
      <span className="workspace-add-name-position" aria-hidden="true" />
      <span className="workspace-add-name-grip-slot" aria-hidden="true" />
      {/* Was a bare MUI Tooltip, always on and unthemed, so it looked nothing
          like the rest of the tutorial's bubbles. "Your own" is the part that
          matters — nothing else on the screen says you can type a name rather
          than wait for one. The aria-label carries the button's name for anyone
          the tooltip does not reach. */}
      <TutorialTooltip title="Add your own name" placement="top">
        <IconButton className="workspace-add-name-button" onClick={onClick} aria-label="Add custom name">
          <AddIcon />
        </IconButton>
      </TutorialTooltip>
    </motion.li>
  );
};

export default WorkspaceAddNameItem;
