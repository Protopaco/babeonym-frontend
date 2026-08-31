import Box from '@mui/material/Box';
import './WorkspaceApprovedNamesSkeleton.css';

const skeletonItems = Array.from({ length: 12 }, (_, index) => `workspace-approved-name-skeleton-${index}`);

const WorkspaceApprovedNamesSkeleton = () => (
  <Box className="workspace-approved-names-skeleton" aria-label="Loading saved names">
    {skeletonItems.map((skeletonItem) => (
      <Box className="workspace-approved-names-skeleton-chip" key={skeletonItem}>
        <Box className="workspace-approved-names-skeleton-label" />
      </Box>
    ))}
  </Box>
);

export default WorkspaceApprovedNamesSkeleton;
