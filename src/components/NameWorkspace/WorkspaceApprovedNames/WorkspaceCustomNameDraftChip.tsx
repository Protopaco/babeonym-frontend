import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import WorkspaceCustomNameDraftActions from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceCustomNameDraftActions';
import { useCustomNameDraftChip } from '@/components/NameWorkspace/WorkspaceApprovedNames/useCustomNameDraftChip';
import './WorkspaceCustomNameDraftChip.css';

type Props = {
  onClose: () => void;
};

const WorkspaceCustomNameDraftChip = ({ onClose }: Props) => {
  const { canSaveCustomName, changeCustomName, customName, errorMessage, handleBlur, handleKeyDown, inputRef, saveCustomName } = useCustomNameDraftChip({
    onClose,
  });

  return (
    <motion.li
      className="workspace-custom-name-draft-chip"
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Box className="workspace-custom-name-draft-label" data-invalid={Boolean(errorMessage)}>
        <input
          ref={inputRef}
          className="workspace-custom-name-draft-input"
          value={customName}
          onBlur={handleBlur}
          onChange={(event) => changeCustomName(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Custom name"
          aria-invalid={Boolean(errorMessage)}
        />
      </Box>
      <WorkspaceCustomNameDraftActions canSaveCustomName={canSaveCustomName} onCancel={onClose} onSave={saveCustomName} />
      {errorMessage ? (
        <Typography className="workspace-custom-name-draft-error" variant="caption" role="alert">
          {errorMessage}
        </Typography>
      ) : null}
    </motion.li>
  );
};

export default WorkspaceCustomNameDraftChip;
