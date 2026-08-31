import BaseTooltip from '@/components/Shared/BaseTooltip/BaseTooltip';
import './WorkspaceModeHeader.css';

type WorkspaceMode = 'add' | 'compare';

type Props = {
  activeMode: WorkspaceMode;
  canCompareNames: boolean;
  onAddModeClick: () => void;
  onCompareModeClick: () => void;
};

const WorkspaceModeHeader = ({ activeMode, canCompareNames, onAddModeClick, onCompareModeClick }: Props) => (
  <div className="workspace-mode-header">
    <div className="workspace-mode-header-inner" data-active-mode={activeMode}>
      <button
        className="workspace-mode-header-button"
        data-active={activeMode === 'add'}
        onClick={onAddModeClick}
        type="button"
      >
        Name Generator
      </button>
      <BaseTooltip title={!canCompareNames ? 'Add at least 2 names to compare.' : ''} placement="top">
        <span className="workspace-mode-header-tooltip-target">
          <button
            className="workspace-mode-header-button"
            data-active={activeMode === 'compare'}
            disabled={!canCompareNames}
            onClick={onCompareModeClick}
            type="button"
          >
            Compare Names
          </button>
        </span>
      </BaseTooltip>
    </div>
  </div>
);

export default WorkspaceModeHeader;
