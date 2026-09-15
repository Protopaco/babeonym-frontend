import Typography from '@mui/material/Typography';
import { AnimatePresence, motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import WorkspaceCustomNameDraftActions from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceCustomNameDraftActions';
import { useCustomNameDraftChip } from '@/components/NameWorkspace/WorkspaceApprovedNames/useCustomNameDraftChip';
import { NAME_MAX_LENGTH } from '@/constants/nameMaxLength';
import '@/components/NameWorkspace/WorkspaceApprovedNames/CustomNameChip.css';

type Props = {
  onClose: () => void;
};

const CustomNameChip = ({ onClose }: Props) => {
  const { canSaveCustomName, changeCustomName, customName, errorMessage, handleBlur, handleKeyDown, inputRef, saveCustomName, saving } =
    useCustomNameDraftChip({
      onClose,
    });

  const chipState = saving ? 'saving' : errorMessage ? 'invalid' : 'default';

  return (
    // A div, not an li. WorkspaceCustomNameDraftItem is the list item; this is
    // the control inside it, and nesting one li in another is invalid HTML.
    <motion.div className="custom-name-chip" layout initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
      <BaseNameChip size="large" state={chipState}>
        <input
          ref={inputRef}
          className="custom-name-chip-input"
          value={customName}
          maxLength={NAME_MAX_LENGTH}
          onBlur={handleBlur}
          onChange={(event) => changeCustomName(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Custom name"
          aria-invalid={Boolean(errorMessage)}
          readOnly={saving}
        />
      </BaseNameChip>
      <WorkspaceCustomNameDraftActions canSaveCustomName={canSaveCustomName} onCancel={onClose} onSave={saveCustomName} />
      {/* A short fade rather than a pop, kept brief so the error still feels
          immediate. The wrapper is unpositioned, so the message still places
          itself against the chip. */}
      <AnimatePresence initial={false}>
        {errorMessage ? (
          <motion.div
            key="custom-name-chip-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.durationSeconds[120], ease: motionTokens.ease.out }}
          >
            <Typography className="custom-name-chip-error" variant="caption" role="alert">
              {errorMessage}
            </Typography>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomNameChip;
