import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { GivenName } from '@/api/generated';
import NameListSkeleton from '@/components/NameList/NameListSkeleton/NameListSkeleton';
import WorkspaceApprovedNamesList from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesList';
import './WorkspaceApprovedNames.css';

type Props = {
  approvedGivenNames: GivenName[];
  isLoading: boolean;
};

const WorkspaceApprovedNames = ({ approvedGivenNames, isLoading }: Props) => {
  return (
    <Container maxWidth="lg" component="section" className="workspace-approved-names" aria-label="Your Names">
      <Typography className="workspace-approved-names-title">Your Names</Typography>
      {isLoading ? <NameListSkeleton /> : null}
      {!isLoading && !approvedGivenNames.length ? (
        <Typography className="workspace-approved-names-empty-state">No saved names yet.</Typography>
      ) : null}
      {!isLoading ? <WorkspaceApprovedNamesList approvedGivenNames={approvedGivenNames} /> : null}
    </Container>
  );
};

export default WorkspaceApprovedNames;
