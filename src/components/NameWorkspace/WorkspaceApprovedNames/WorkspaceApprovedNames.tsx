import Typography from '@mui/material/Typography';
import { AnimatePresence, motion } from 'motion/react';
import type { GivenName } from '@/api/generated';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import WorkspaceApprovedNamesList from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesList/WorkspaceApprovedNamesList';
import WorkspaceApprovedNamesSkeleton from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesSkeleton/WorkspaceApprovedNamesSkeleton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import motionTokens from '@/themes/motion.theme';
import './WorkspaceApprovedNames.css';

// One string for the two headers, which are the same section at two widths.
const SECTION_HINT = 'Your favourites, best first';

type Props = {
  approvedGivenNames: GivenName[];
  isLoading: boolean;
};

const WorkspaceApprovedNames = ({ approvedGivenNames, isLoading }: Props) => {
  const fadeTransition = { duration: motionTokens.durationSeconds[180], ease: motionTokens.ease.out } as const;

  return (
    <section className="workspace-approved-names" aria-label="Your Names">
      {/* On the header rather than on the list, so the hint is about the
          section rather than about any one name in it. */}
      <TutorialTooltip title={SECTION_HINT} placement="top-start">
        <div className="workspace-approved-names-desktop-header">
          <SectionHeader title="Your Names" />
        </div>
      </TutorialTooltip>
      <TutorialTooltip title={SECTION_HINT} placement="top-start">
        <div className="workspace-approved-names-mobile-header">
          <MobileSectionHeader title="Your Names" />
        </div>
      </TutorialTooltip>
      {/* A plain fade from the skeleton to what loaded, one leaving before the
          other arrives, rather than the list popping in over it. */}
      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
            <WorkspaceApprovedNamesSkeleton />
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
            {/* Its own fade, so removing the last name does not pop it in. */}
            <AnimatePresence initial={false}>
              {!approvedGivenNames.length ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
                  <Typography className="workspace-approved-names-empty-state">No saved names yet.</Typography>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <WorkspaceApprovedNamesList approvedGivenNames={approvedGivenNames} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkspaceApprovedNames;
