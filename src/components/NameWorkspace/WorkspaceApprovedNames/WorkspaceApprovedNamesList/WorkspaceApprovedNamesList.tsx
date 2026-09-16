import { AnimatePresence, LayoutGroup, Reorder } from 'motion/react';
import { useState } from 'react';
import type { GivenName } from '@/api/generated';
import WorkspaceAddNameItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceAddNameItem/WorkspaceAddNameItem';
import WorkspaceApprovedNameItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNameItem/WorkspaceApprovedNameItem';
import WorkspaceCustomNameDraftItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceCustomNameDraftItem/WorkspaceCustomNameDraftItem';
import { useApprovedNamesReorder } from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesList/useApprovedNamesReorder';
import approvedGivenNameLimit from '@/utils/approvedGivenNameLimit';
import './WorkspaceApprovedNamesList.css';

type Props = {
  approvedGivenNames: GivenName[];
};

const WorkspaceApprovedNamesList = ({ approvedGivenNames }: Props) => {
  const [draftVisible, setDraftVisible] = useState(false);
  const { reorder } = useApprovedNamesReorder(approvedGivenNames);
  // The server refuses the write past this, so the button is taken away rather
  // than left to fail. Nothing explains its absence here; the generator is
  // showing the limit message at the same time, which is where the answer is.
  const atApprovedNameLimit = approvedGivenNames.length >= approvedGivenNameLimit;

  return (
    <LayoutGroup>
      {/* Array order is the ranking. The list used to sort on rating here, but a
          dragged name keeps its old rating until the write comes back, so
          sorting would undo the move on the next render. The server returns them
          rating-sorted, so the order arrives correct.

          xy rather than a single axis because the list wraps into columns, and a
          name can be dragged sideways as well as up and down. */}
      <Reorder.Group as="ol" axis="xy" className="workspace-approved-names-list" values={approvedGivenNames} onReorder={reorder}>
        {approvedGivenNames.map((name, index) => (
          <WorkspaceApprovedNameItem approvedGivenName={name} key={name.givenCustomNameBridgeId} position={index + 1} />
        ))}
        {/* Plain list items rather than Reorder.Items, so they sit in the same
            grid flow as the names without being draggable. Reorder only tracks
            what registers with it, so these are invisible to its geometry and
            cannot become a drop position. */}
        {/* popLayout lifts a leaving draft out of the flow as it starts to
            collapse, so its replacement — the add button on cancel, the saved
            name on save — takes the slot at once instead of after the animation. */}
        <AnimatePresence mode="popLayout" initial={false}>
          {draftVisible ? <WorkspaceCustomNameDraftItem key="draft" onClose={() => setDraftVisible(false)} /> : null}
          {!draftVisible && !atApprovedNameLimit ? <WorkspaceAddNameItem key="add" onClick={() => setDraftVisible(true)} /> : null}
        </AnimatePresence>
      </Reorder.Group>
    </LayoutGroup>
  );
};

export default WorkspaceApprovedNamesList;
