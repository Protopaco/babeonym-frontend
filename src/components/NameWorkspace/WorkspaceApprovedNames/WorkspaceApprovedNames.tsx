import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LayoutGroup } from 'motion/react';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import type { GivenName } from '@/api/generated';
import NameListSkeleton from '@/components/NameList/NameListSkeleton/NameListSkeleton';
import WorkspaceApprovedNameItem from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNameItem';
import './WorkspaceApprovedNames.css';

type Props = {
  approvedGivenNames: GivenName[];
  isLoading: boolean;
};

const WorkspaceApprovedNames = ({ approvedGivenNames, isLoading }: Props) => {
  const rankedNames = useMemo(() => {
    return [...approvedGivenNames].sort((left, right) => right.rating - left.rating);
  }, [approvedGivenNames]);
  const rankingRowCount = Math.max(1, Math.ceil(rankedNames.length / 3));

  return (
    <Container maxWidth="lg" component="section" className="workspace-approved-names" aria-label="Your Names">
      <Typography className="workspace-approved-names-title">Your Names</Typography>
      {isLoading ? <NameListSkeleton /> : null}
      {!isLoading && rankedNames.length ? (
        <LayoutGroup>
          <ol
            className="workspace-approved-names-list"
            style={{ '--workspace-approved-names-row-count': rankingRowCount } as CSSProperties}
          >
            {rankedNames.map((name, index) => (
              <WorkspaceApprovedNameItem
                approvedGivenName={name}
                key={name.givenCustomNameBridgeId}
                position={index + 1}
              />
            ))}
          </ol>
        </LayoutGroup>
      ) : null}
      {!isLoading && !rankedNames.length ? (
        <Typography className="workspace-approved-names-empty-state">No saved names yet.</Typography>
      ) : null}
    </Container>
  );
};

export default WorkspaceApprovedNames;
