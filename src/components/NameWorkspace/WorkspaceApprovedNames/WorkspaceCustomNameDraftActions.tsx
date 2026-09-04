import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import NameChipAction from '@/components/Shared/NameChipAction/NameChipAction';
import './WorkspaceCustomNameDraftActions.css';

type Props = {
  canSaveCustomName: boolean;
  onCancel: () => void;
  onSave: () => void;
};

const WorkspaceCustomNameDraftActions = ({ canSaveCustomName, onCancel, onSave }: Props) => {
  return (
    <div className="workspace-custom-name-draft-drawer" data-can-save={canSaveCustomName}>
      <div className="workspace-custom-name-draft-cancel">
        <NameChipAction icon={<CloseIcon />} label="Cancel custom name" onClick={onCancel} size="large" fill="secondary" />
      </div>
      <div className="workspace-custom-name-draft-save">
        <NameChipAction
          icon={<CheckIcon />}
          label="Save custom name"
          onClick={onSave}
          size="large"
          fill="primary"
          disabled={!canSaveCustomName}
        />
      </div>
    </div>
  );
};

export default WorkspaceCustomNameDraftActions;
