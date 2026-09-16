import AddIcon from '@mui/icons-material/Add';
import { motion } from 'motion/react';
import type { Ref } from 'react';
import CustomNameChip from '@/components/NameWorkspace/WorkspaceApprovedNames/CustomNameChip/CustomNameChip';
import motionTokens from '@/themes/motion.theme';
import './WorkspaceCustomNameDraftItem.css';

type Props = {
  onClose: () => void;
  // Handed down by the list's AnimatePresence, which measures the row through it
  // to lift it out of the layout while it collapses. Without it the row stays in
  // flow and whatever replaces it waits underneath.
  ref?: Ref<HTMLLIElement>;
};

const WorkspaceCustomNameDraftItem = ({ onClose, ref }: Props) => {
  return (
    <motion.li
      ref={ref}
      className="workspace-custom-name-draft-item"
      layout="position"
      // Anchored at the left edge, where the marker is, so the chip shrinks back
      // towards it rather than into its own middle.
      style={{ originX: 0 }}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      // Shrinks and fades together over the same duration, so the shrink is seen
      // the whole way. Scaled evenly, so the name does not squash. The add button
      // grows back in from the same scale as this leaves.
      exit={{
        opacity: 0,
        scale: 0.85,
        transition: { duration: motionTokens.durationSeconds[120], ease: motionTokens.ease.out },
      }}
    >
      <AddIcon className="workspace-custom-name-draft-marker" />
      <span className="workspace-custom-name-draft-grip-slot" aria-hidden="true" />
      <CustomNameChip onClose={onClose} />
    </motion.li>
  );
};

export default WorkspaceCustomNameDraftItem;
