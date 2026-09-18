import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import { motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';
import './WorkspaceModeHeader.css';

type WorkspaceMode = 'add' | 'compare';

type Props = {
  activeMode: WorkspaceMode;
  onAddModeClick: () => void;
  onCompareModeClick: () => void;
};

// The rule and the type scale come from SectionHeader, so this owns only the
// two buttons. Which mode is active is carried by their colour alone.
const WorkspaceModeHeader = ({ activeMode, onAddModeClick, onCompareModeClick }: Props) => {
  // One pill shared by both tabs. Because the two render it under the same
  // layoutId, motion sees it leave one button and arrive in the other and
  // tweens the box between them, including the width change between the two
  // labels. The buttons sit in different SectionHeader slots, which layoutId
  // does not care about.
  const activePill = (
    <motion.span
      layoutId="workspace-mode-header-pill"
      className="workspace-mode-header-pill"
      transition={{ duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.out }}
    />
  );

  const compareTab = (
    <span className="workspace-mode-header-tooltip-target">
      <button className="workspace-mode-header-button" data-active={activeMode === 'compare'} onClick={onCompareModeClick} type="button">
        {activeMode === 'compare' ? activePill : null}
        <span className="workspace-mode-header-label">Compare Names</span>
      </button>
    </span>
  );

  return (
    <div className="workspace-mode-header">
      <SectionHeader
        title={
          <TutorialTooltip title="Find new names" placement="bottom">
            <button className="workspace-mode-header-button" data-active={activeMode === 'add'} onClick={onAddModeClick} type="button">
              {activeMode === 'add' ? activePill : null}
              <span className="workspace-mode-header-label">Name Generator</span>
            </button>
          </TutorialTooltip>
        }
        action={
          <TutorialTooltip title="Rank the ones you saved" placement="bottom">
            {compareTab}
          </TutorialTooltip>
        }
      />
    </div>
  );
};

export default WorkspaceModeHeader;
