import { useState } from 'react';
import WorkspaceFilterLayout from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterLayout';
import './WorkspaceFilterSurface.css';

type WorkspaceFilterSurfaceMode = 'add' | 'inactive';

type Props = {
  mode: WorkspaceFilterSurfaceMode;
};

const WorkspaceFilterSurface = ({ mode }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (mode === 'inactive') {
    return <div className="workspace-filter-surface workspace-filter-surface--inactive" aria-hidden="true" />;
  }

  return (
    <section
      className={`workspace-filter-surface ${
        isOpen ? 'workspace-filter-surface--open' : 'workspace-filter-surface--closed'
      }`}
      aria-label="Name filters"
    >
      <WorkspaceFilterLayout isOpen={isOpen} onToggle={() => setIsOpen((currentValue) => !currentValue)} />
    </section>
  );
};

export default WorkspaceFilterSurface;
