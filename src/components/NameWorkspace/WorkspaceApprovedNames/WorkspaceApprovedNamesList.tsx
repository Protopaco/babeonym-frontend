import { LayoutGroup, Reorder } from 'motion/react';
import { useState } from 'react';
import type { GivenName } from '@/api/generated';
import WorkspaceAddNameItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceAddNameItem';
import WorkspaceApprovedNameItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNameItem';
import WorkspaceCustomNameDraftItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceCustomNameDraftItem';
import { useApprovedNamesReorder } from '@/components/NameWorkspace/WorkspaceApprovedNames/useApprovedNamesReorder';
import './WorkspaceApprovedNamesList.css';

type Props = {
  approvedGivenNames: GivenName[];
};

const WorkspaceApprovedNamesList = ({ approvedGivenNames }: Props) => {
  const [draftVisible, setDraftVisible] = useState(false);
  const { reorder } = useApprovedNamesReorder(approvedGivenNames);

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
        {draftVisible ? <WorkspaceCustomNameDraftItem onClose={() => setDraftVisible(false)} /> : null}
        {!draftVisible ? <WorkspaceAddNameItem onClick={() => setDraftVisible(true)} /> : null}
      </Reorder.Group>
    </LayoutGroup>
  );
};

export default WorkspaceApprovedNamesList;
