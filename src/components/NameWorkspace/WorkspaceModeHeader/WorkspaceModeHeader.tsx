import './WorkspaceModeHeader.css';

type WorkspaceMode = 'add' | 'compare';

type Props = {
  activeMode: WorkspaceMode;
  canCompareNames: boolean;
  onAddModeClick: () => void;
  onCompareModeClick: () => void;
};

const WorkspaceModeHeader = ({ activeMode, canCompareNames, onAddModeClick, onCompareModeClick }: Props) => (
  <div className="workspace-mode-header" data-active-mode={activeMode}>
    <button
      className="workspace-mode-header-button"
      data-active={activeMode === 'add'}
      onClick={onAddModeClick}
      type="button"
    >
      Name Generator
    </button>
    <span className="workspace-mode-header-tooltip" data-disabled={!canCompareNames}>
      <button
        aria-describedby={!canCompareNames ? 'workspace-mode-header-compare-tooltip' : undefined}
        className="workspace-mode-header-button"
        data-active={activeMode === 'compare'}
        disabled={!canCompareNames}
        onClick={onCompareModeClick}
        type="button"
      >
        Compare Names
      </button>
      {!canCompareNames ? (
        <span className="workspace-mode-header-tooltip-text" id="workspace-mode-header-compare-tooltip" role="tooltip">
          Add at least 2 names to compare.
        </span>
      ) : null}
    </span>
  </div>
);

export default WorkspaceModeHeader;
