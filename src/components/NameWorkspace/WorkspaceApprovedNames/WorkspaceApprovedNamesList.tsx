import { LayoutGroup } from 'motion/react';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import type { GivenName } from '@/api/generated';
import WorkspaceAddNameItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceAddNameItem';
import WorkspaceApprovedNameItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNameItem';
import WorkspaceCustomNameDraftItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceCustomNameDraftItem';
import './WorkspaceApprovedNamesList.css';

type Props = {
  approvedGivenNames: GivenName[];
};

const WorkspaceApprovedNamesList = ({ approvedGivenNames }: Props) => {
  const [draftVisible, setDraftVisible] = useState(false);
  const rankedNames = useMemo(() => {
    return [...approvedGivenNames].sort((left, right) => right.rating - left.rating);
  }, [approvedGivenNames]);
  const itemCount = rankedNames.length + (draftVisible ? 1 : 0) + 1;
  const rankingRowCount = Math.max(1, Math.ceil(itemCount / 3));

  return (
    <LayoutGroup>
      <ol
        className="workspace-approved-names-list"
        style={{ '--workspace-approved-names-row-count': rankingRowCount } as CSSProperties}
      >
        {rankedNames.map((name, index) => (
          <WorkspaceApprovedNameItem approvedGivenName={name} key={name.givenCustomNameBridgeId} position={index + 1} />
        ))}
        {draftVisible ? <WorkspaceCustomNameDraftItem onClose={() => setDraftVisible(false)} /> : null}
        {!draftVisible ? <WorkspaceAddNameItem onClick={() => setDraftVisible(true)} /> : null}
      </ol>
    </LayoutGroup>
  );
};

export default WorkspaceApprovedNamesList;
