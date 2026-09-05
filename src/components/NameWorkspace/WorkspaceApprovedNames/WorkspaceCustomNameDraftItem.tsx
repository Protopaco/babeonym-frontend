import AddIcon from '@mui/icons-material/Add';
import { motion } from 'motion/react';
import CustomNameChip from '@/components/NameWorkspace/WorkspaceApprovedNames/CustomNameChip';
import './WorkspaceCustomNameDraftItem.css';

type Props = {
  onClose: () => void;
};

const WorkspaceCustomNameDraftItem = ({ onClose }: Props) => {
  return (
    <motion.li
      className="workspace-custom-name-draft-item"
      layout="position"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <AddIcon className="workspace-custom-name-draft-marker" />
      <span className="workspace-custom-name-draft-grip-slot" aria-hidden="true" />
      <CustomNameChip onClose={onClose} />
    </motion.li>
  );
};

export default WorkspaceCustomNameDraftItem;
