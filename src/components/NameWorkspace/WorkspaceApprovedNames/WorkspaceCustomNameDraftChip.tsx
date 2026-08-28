import Box from '@mui/material/Box';
import { motion } from 'motion/react';
import WorkspaceCustomNameDraftActions from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceCustomNameDraftActions';
import { useCustomNameDraftChip } from '@/components/NameWorkspace/WorkspaceApprovedNames/useCustomNameDraftChip';
import './WorkspaceCustomNameDraftChip.css';

type Props = {
  onClose: () => void;
};

const WorkspaceCustomNameDraftChip = ({ onClose }: Props) => {
  const { canSaveCustomName, customName, handleBlur, handleKeyDown, inputRef, saveCustomName, setCustomName } = useCustomNameDraftChip({
    onClose,
  });

  return (
    <motion.li
      className="workspace-custom-name-draft-chip"
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Box className="workspace-custom-name-draft-label">
        <input
          ref={inputRef}
          className="workspace-custom-name-draft-input"
          value={customName}
          onBlur={handleBlur}
          onChange={(event) => setCustomName(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Custom name"
        />
      </Box>
      <WorkspaceCustomNameDraftActions canSaveCustomName={canSaveCustomName} onCancel={onClose} onSave={saveCustomName} />
    </motion.li>
  );
};

export default WorkspaceCustomNameDraftChip;
