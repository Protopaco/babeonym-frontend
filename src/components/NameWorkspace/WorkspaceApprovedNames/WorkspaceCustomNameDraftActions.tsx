import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import './WorkspaceCustomNameDraftActions.css';

type Props = {
  canSaveCustomName: boolean;
  onCancel: () => void;
  onSave: () => void;
};

const WorkspaceCustomNameDraftActions = ({ canSaveCustomName, onCancel, onSave }: Props) => {
  return (
    <div className="workspace-custom-name-draft-action-drawer" data-can-save={canSaveCustomName}>
      <IconButton
        className="workspace-custom-name-draft-cancel"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onCancel}
        aria-label="Cancel custom name"
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        className="workspace-custom-name-draft-save"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onSave}
        aria-label="Save custom name"
        disabled={!canSaveCustomName}
      >
        <CheckIcon />
      </IconButton>
    </div>
  );
};

export default WorkspaceCustomNameDraftActions;
