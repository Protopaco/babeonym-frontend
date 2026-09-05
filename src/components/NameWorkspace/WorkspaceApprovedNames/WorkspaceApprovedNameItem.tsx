import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Typography from '@mui/material/Typography';
import { Reorder, useDragControls } from 'motion/react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { GivenName } from '@/api/generated';
import ListNameChip from '@/components/Shared/ListNameChip/ListNameChip';
import './WorkspaceApprovedNameItem.css';

type Props = {
  approvedGivenName: GivenName;
  position: number;
};

const WorkspaceApprovedNameItem = ({ approvedGivenName, position }: Props) => {
  const dragControls = useDragControls();

  // Started by hand rather than by motion's own listener. Leaving dragListener
  // off is what keeps motion from setting touch-action: none across the whole
  // row, which is what would stop a finger scrolling the page.
  //
  // A mouse can pick a name up anywhere on the row, since nothing else wants
  // that gesture. A finger cannot: a swipe starting on a name is far more often
  // a scroll, and no delay or movement threshold tells the two apart reliably.
  // So on touch the grip is the only place a drag can begin, and touch-action is
  // turned off on the grip alone.
  const startMouseDrag = (event: ReactPointerEvent) => {
    if (event.pointerType === 'touch') return;
    dragControls.start(event);
  };

  const startGripDrag = (event: ReactPointerEvent) => {
    dragControls.start(event);
  };

  return (
    // A spring rather than one of the duration tokens, because a spring has no
    // duration to take from them. It is the right shape here: the list reorders
    // while items may still be moving, and a spring absorbs that interruption
    // where a fixed duration would restart and jerk.
    <Reorder.Item
      as="li"
      value={approvedGivenName}
      className="workspace-approved-name"
      dragListener={false}
      dragControls={dragControls}
      onPointerDown={startMouseDrag}
      layout="position"
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
    >
      <Typography className="workspace-approved-name-position">{position}</Typography>
      {/* Shown only to a coarse pointer, where dragging needs somewhere of its
          own to start. Hidden from assistive technology: it does nothing a
          keyboard or screen reader can use, and reordering by keyboard does not
          exist yet either way. */}
      <span className="workspace-approved-name-grip" aria-hidden="true" onPointerDown={startGripDrag}>
        <DragIndicatorIcon />
      </span>
      <ListNameChip approvedGivenName={approvedGivenName} size="large" />
    </Reorder.Item>
  );
};

export default WorkspaceApprovedNameItem;
