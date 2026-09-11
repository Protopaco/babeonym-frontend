import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Typography from '@mui/material/Typography';
import { Reorder, useDragControls } from 'motion/react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { GivenName } from '@/api/generated';
import ListNameChip from '@/components/Shared/ListNameChip/ListNameChip';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './WorkspaceApprovedNameItem.css';

type Props = {
  approvedGivenName: GivenName;
  position: number;
};

const GRIP_HINT = 'Drag to reorder';

const WorkspaceApprovedNameItem = ({ approvedGivenName, position }: Props) => {
  const dragControls = useDragControls();

  // The grip and the delete drawer both repeat once per name, and a tooltip
  // stays open on a coarse pointer — which for the grip is the only place it is
  // shown at all. Hinting every row would put a bubble on every name at once,
  // so the top row carries both hints on behalf of the list. It is also the row
  // the grip's copy is talking about.
  const isFirstItem = position === 1;

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

  // Shown only to a coarse pointer, where dragging needs somewhere of its own to
  // start. Hidden from assistive technology: it does nothing a keyboard or
  // screen reader can use, and reordering by keyboard does not exist yet either
  // way.
  //
  // First in the row rather than between the rank and the name: those two belong
  // together, and a control sat between them separated a name from its own
  // position.
  //
  // Built here rather than inline so the unhinted rows render it bare —
  // TutorialTooltip wraps its child in a span, which would otherwise make that
  // span the flex item in every row instead of the grip.
  const grip = (
    <span className="workspace-approved-name-grip" aria-hidden="true" onPointerDown={startGripDrag}>
      <DragIndicatorIcon />
    </span>
  );

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
      {isFirstItem ? <TutorialTooltip title={GRIP_HINT}>{grip}</TutorialTooltip> : grip}
      <Typography className="workspace-approved-name-position">{position}</Typography>
      <ListNameChip approvedGivenName={approvedGivenName} size="large" showTutorialHint={isFirstItem} />
    </Reorder.Item>
  );
};

export default WorkspaceApprovedNameItem;
