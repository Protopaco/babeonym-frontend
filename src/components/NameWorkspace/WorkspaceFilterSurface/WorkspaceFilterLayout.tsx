import WorkspaceFilterActions from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterActions';
import CultureFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/CultureFilterColumn';
import DecadeFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/DecadeFilterColumn';
import GenderFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/GenderFilterColumn';
import LanguageFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/LanguageFilterColumn';
import WorkspaceFilterToggle from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterToggle';
import './WorkspaceFilterLayout.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterLayout = ({ isOpen, onToggle }: Props) => (
  <div className="workspace-filter-layout">
    <WorkspaceFilterToggle isOpen={isOpen} onToggle={onToggle} />
    <div className="workspace-filter-layout-columns" aria-label="Filter categories">
      <GenderFilterColumn isOpen={isOpen} />
      <DecadeFilterColumn isOpen={isOpen} />
      <CultureFilterColumn isOpen={isOpen} />
      <LanguageFilterColumn isOpen={isOpen} />
    </div>
    <WorkspaceFilterActions isOpen={isOpen} />
  </div>
);

export default WorkspaceFilterLayout;
