import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { GivenName } from '@/api/generated';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import WorkspaceApprovedNamesList from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesList';
import WorkspaceApprovedNamesSkeleton from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesSkeleton';
import './WorkspaceApprovedNames.css';

type Props = {
  approvedGivenNames: GivenName[];
  isLoading: boolean;
};

const WorkspaceApprovedNames = ({ approvedGivenNames, isLoading }: Props) => {
  return (
    <Container maxWidth="lg" component="section" className="workspace-approved-names" aria-label="Your Names">
      <div className="workspace-approved-names-desktop-header">
        <SectionHeader title="Your Names" />
      </div>
      <div className="workspace-approved-names-mobile-header">
        <MobileSectionHeader title="Your Names" />
      </div>
      {isLoading ? <WorkspaceApprovedNamesSkeleton /> : null}
      {!isLoading && !approvedGivenNames.length ? (
        <Typography className="workspace-approved-names-empty-state">No saved names yet.</Typography>
      ) : null}
      {!isLoading ? <WorkspaceApprovedNamesList approvedGivenNames={approvedGivenNames} /> : null}
    </Container>
  );
};

export default WorkspaceApprovedNames;
