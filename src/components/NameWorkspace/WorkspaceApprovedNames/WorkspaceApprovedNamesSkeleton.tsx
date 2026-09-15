import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesList.css';
import '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNameItem.css';
import './WorkspaceApprovedNamesSkeleton.css';

const skeletonItems = Array.from({ length: 12 }, (_, index) => `workspace-approved-name-skeleton-${index}`);

// Borrows the list's and the row's own classes rather than copying their
// layout, so the placeholder sits exactly where the names will and cannot drift
// when the list changes. The grip and rank are left empty: they only reserve
// their widths. This file styles the placeholder chip alone.
const WorkspaceApprovedNamesSkeleton = () => (
  <ol className="workspace-approved-names-list" aria-label="Loading saved names">
    {skeletonItems.map((skeletonItem) => (
      <li className="workspace-approved-name" key={skeletonItem}>
        <span className="workspace-approved-name-grip" aria-hidden="true" />
        <Typography className="workspace-approved-name-position" aria-hidden="true" />
        <div className="workspace-approved-name-chip-slot">
          <Box className="workspace-approved-names-skeleton-label" />
        </div>
      </li>
    ))}
  </ol>
);

export default WorkspaceApprovedNamesSkeleton;
