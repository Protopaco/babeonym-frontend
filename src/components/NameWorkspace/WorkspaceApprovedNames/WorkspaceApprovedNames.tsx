import Typography from '@mui/material/Typography';
import type { GivenName } from '@/api/generated';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import WorkspaceApprovedNamesList from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesList';
import WorkspaceApprovedNamesSkeleton from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesSkeleton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './WorkspaceApprovedNames.css';

// One string for the two headers, which are the same section at two widths.
const SECTION_HINT = 'Your favourites, best first';

type Props = {
  approvedGivenNames: GivenName[];
  isLoading: boolean;
};

const WorkspaceApprovedNames = ({ approvedGivenNames, isLoading }: Props) => {
  return (
    <section className="workspace-approved-names" aria-label="Your Names">
      {/* On the header rather than on the list, so the hint is about the
          section rather than about any one name in it. */}
      <TutorialTooltip title={SECTION_HINT} placement="left">
        <div className="workspace-approved-names-desktop-header">
          <SectionHeader title="Your Names" />
        </div>
      </TutorialTooltip>
      <TutorialTooltip title={SECTION_HINT} placement="right">
        <div className="workspace-approved-names-mobile-header">
          <MobileSectionHeader title="Your Names" />
        </div>
      </TutorialTooltip>
      {isLoading ? <WorkspaceApprovedNamesSkeleton /> : null}
      {!isLoading && !approvedGivenNames.length ? (
        <Typography className="workspace-approved-names-empty-state">No saved names yet.</Typography>
      ) : null}
      {!isLoading ? <WorkspaceApprovedNamesList approvedGivenNames={approvedGivenNames} /> : null}
    </section>
  );
};

export default WorkspaceApprovedNames;
