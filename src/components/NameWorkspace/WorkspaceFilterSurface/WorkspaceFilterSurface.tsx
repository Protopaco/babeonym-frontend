import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import WorkspaceFilterLayout from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterLayout';
import motionTokens from '@/themes/motion.theme';
import './WorkspaceFilterSurface.css';

type WorkspaceFilterSurfaceMode = 'filters' | 'collapsed';

type Props = {
  mode: WorkspaceFilterSurfaceMode;
};

// One element in both modes rather than two branches, so collapsing is a height
// the surface animates rather than a swap React has nothing to tween between.
// Collapsed is not an empty state — it is the narrow band that keeps the
// header's shape when filters do not apply, either because the workspace is
// comparing names or because the user is not on the workspace at all.
const WorkspaceFilterSurface = ({ mode }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const showFilters = mode === 'filters';

  return (
    <section
      className="workspace-filter-surface"
      data-mode={mode}
      data-open={showFilters && isOpen}
      aria-label="Name filters"
      aria-hidden={!showFilters}
    >
      <AnimatePresence initial={false}>
        {showFilters && (
          <motion.div
            className="workspace-filter-surface-reveal"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            // Eased at both ends rather than out only, unlike the other two
            // halves of the mode switch. This one travels about 21px where they
            // travel hundreds, so an ease-out tail covers a couple of pixels and
            // the collapse looks finished long before they are. Spreading the
            // movement across the full duration makes the three land together.
            transition={{ duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.inOut }}
          >
            <WorkspaceFilterLayout isOpen={isOpen} onToggle={() => setIsOpen((currentValue) => !currentValue)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkspaceFilterSurface;
