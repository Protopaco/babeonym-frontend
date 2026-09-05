import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import WorkspaceCustomNameDraftActions from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceCustomNameDraftActions';
import { useCustomNameDraftChip } from '@/components/NameWorkspace/WorkspaceApprovedNames/useCustomNameDraftChip';
import '@/components/NameWorkspace/WorkspaceApprovedNames/CustomNameChip.css';

// The longest name in given_names is 15 characters, so a custom name capped
// here can never outrun the canonical names it sits alongside. It is also
// roughly where a name stops fitting the compare chip, which clips rather than
// wrapping or shrinking.
//
// Enforced only in the input: the backend accepts any length, so this is a
// guard rail rather than a constraint.
const CUSTOM_NAME_MAX_LENGTH = 15;

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
    <motion.li className="custom-name-chip" layout initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
      <BaseNameChip size="large" state={chipState}>
        <input
          ref={inputRef}
          className="custom-name-chip-input"
          value={customName}
          maxLength={CUSTOM_NAME_MAX_LENGTH}
          onBlur={handleBlur}
          onChange={(event) => changeCustomName(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Custom name"
          aria-invalid={Boolean(errorMessage)}
          readOnly={saving}
        />
      </BaseNameChip>
      <WorkspaceCustomNameDraftActions canSaveCustomName={canSaveCustomName} onCancel={onClose} onSave={saveCustomName} />
      {errorMessage ? (
        <Typography className="custom-name-chip-error" variant="caption" role="alert">
          {errorMessage}
        </Typography>
      ) : null}
    </motion.li>
  );
};

export default CustomNameChip;
