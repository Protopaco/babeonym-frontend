import type { KeyboardEvent } from 'react';
import { useRef } from 'react';
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

// Two tabs, centred. Which mode is active is carried by the pill alone.
const WorkspaceModeHeader = ({ activeMode, onAddModeClick, onCompareModeClick }: Props) => {
  const addTabRef = useRef<HTMLButtonElement>(null);
  const compareTabRef = useRef<HTMLButtonElement>(null);

  // The arrow keys a screen reader user expects of anything announced as tabs.
  // Only the active tab is in the Tab order, so this is how the other one is
  // reached. With two tabs, either arrow means the other one. Selecting on
  // arrival rather than waiting for Enter, because switching mode is cheap.
  const handleTabListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();

    if (activeMode === 'add') {
      onCompareModeClick();
      compareTabRef.current?.focus();
      return;
    }

    onAddModeClick();
    addTabRef.current?.focus();
  };

  // One pill shared by both tabs. Because the two render it under the same
  // layoutId, motion sees it leave one button and arrive in the other and
  // tweens the box between them, including the width change between the two
  // labels.
  const activePill = (
    <motion.span
      layoutId="workspace-mode-header-pill"
      className="workspace-mode-header-pill"
      transition={{ duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.out }}
    />
  );

  const compareTab = (
    <span className="workspace-mode-header-tooltip-target">
      <button
        ref={compareTabRef}
        className="workspace-mode-header-button"
        role="tab"
        aria-selected={activeMode === 'compare'}
        tabIndex={activeMode === 'compare' ? 0 : -1}
        data-active={activeMode === 'compare'}
        onClick={onCompareModeClick}
        type="button"
      >
        {activeMode === 'compare' ? activePill : null}
        <span className="workspace-mode-header-label">Compare Names</span>
      </button>
    </span>
  );

  return (
    <div className="workspace-mode-header" role="tablist" aria-label="Workspace mode" onKeyDown={handleTabListKeyDown}>
      <TutorialTooltip title="Find new names" placement="bottom">
        <button
          ref={addTabRef}
          className="workspace-mode-header-button"
          role="tab"
          aria-selected={activeMode === 'add'}
          tabIndex={activeMode === 'add' ? 0 : -1}
          data-active={activeMode === 'add'}
          onClick={onAddModeClick}
          type="button"
        >
          {activeMode === 'add' ? activePill : null}
          <span className="workspace-mode-header-label">Name Generator</span>
        </button>
      </TutorialTooltip>
      <TutorialTooltip title="Rank the ones you saved" placement="bottom">
        {compareTab}
      </TutorialTooltip>
    </div>
  );
};

export default WorkspaceModeHeader;
