import WorkspaceFilterActions from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterActions';
import CultureFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/CultureFilterColumn';
import DecadeFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/DecadeFilterColumn';
import GenderFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/GenderFilterColumn';
import LanguageFilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/LanguageFilterColumn';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import WorkspaceFilterToggle from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterToggle';
import './WorkspaceFilterLayout.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterLayout = ({ isOpen, onToggle }: Props) => (
  <div className="workspace-filter-layout">
    <div className="workspace-filter-layout-summary-row">
      <div className="workspace-filter-layout-applied-chips" aria-label="Applied filters">
        <WorkspaceAppliedFilterChip label="Gender: Neutral" />
        <WorkspaceAppliedFilterChip label="Decade: 1990s" />
        <WorkspaceAppliedFilterChip label="Culture: Irish" />
        <WorkspaceAppliedFilterChip label="Language: French" />
      </div>
      <WorkspaceFilterToggle isOpen={isOpen} onToggle={onToggle} />
    </div>
    {isOpen && (
      <div className="workspace-filter-layout-selector-row">
        <div className="workspace-filter-layout-columns" aria-label="Available filter categories">
          <GenderFilterColumn />
          <DecadeFilterColumn />
          <CultureFilterColumn />
          <LanguageFilterColumn />
        </div>
        <WorkspaceFilterActions isOpen={isOpen} />
      </div>
    )}
  </div>
);

export default WorkspaceFilterLayout;
