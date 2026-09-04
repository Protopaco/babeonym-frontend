import BaseTooltip from '@/components/Shared/BaseTooltip/BaseTooltip';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import './WorkspaceModeHeader.css';

type WorkspaceMode = 'add' | 'compare';

type Props = {
  activeMode: WorkspaceMode;
  canCompareNames: boolean;
  onAddModeClick: () => void;
  onCompareModeClick: () => void;
};

// The rule and the type scale come from SectionHeader, so this owns only the
// two buttons. Which mode is active is carried by their colour alone.
const WorkspaceModeHeader = ({ activeMode, canCompareNames, onAddModeClick, onCompareModeClick }: Props) => {
  // The tab you are already on is never disabled, whatever the name count says.
  // A compare link opened directly is granted while the names load, so without
  // this the tab would be active and disabled at once — and the disabled rule
  // paints the label the same colour as the active fill, hiding it.
  const compareTabDisabled = !canCompareNames && activeMode !== 'compare';

  return (
    <div className="workspace-mode-header">
      <SectionHeader
        title={
          <button className="workspace-mode-header-button" data-active={activeMode === 'add'} onClick={onAddModeClick} type="button">
            Name Generator
          </button>
        }
        action={
          <BaseTooltip title={compareTabDisabled ? 'Add at least 2 names to compare.' : ''} placement="top">
            <span className="workspace-mode-header-tooltip-target">
              <button
                className="workspace-mode-header-button"
                data-active={activeMode === 'compare'}
                disabled={compareTabDisabled}
                onClick={onCompareModeClick}
                type="button"
              >
                Compare Names
              </button>
            </span>
          </BaseTooltip>
        }
      />
    </div>
  );
};

export default WorkspaceModeHeader;
