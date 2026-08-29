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
    <div className="workspace-filter-layout-label-row">
      <WorkspaceFilterToggle isOpen={isOpen} onToggle={onToggle} />
      <div className="workspace-filter-layout-columns" aria-label="Filter category labels">
        <GenderFilterColumn mode="label" />
        <DecadeFilterColumn mode="label" />
        <CultureFilterColumn mode="label" />
        <LanguageFilterColumn mode="label" />
      </div>
      <div className="workspace-filter-layout-spacer" />
    </div>
    {isOpen && (
      <div className="workspace-filter-layout-selector-row">
        <div className="workspace-filter-layout-spacer" />
        <div className="workspace-filter-layout-columns" aria-label="Available filter categories">
          <GenderFilterColumn mode="selector" />
          <DecadeFilterColumn mode="selector" />
          <CultureFilterColumn mode="selector" />
          <LanguageFilterColumn mode="selector" />
        </div>
        <WorkspaceFilterActions isOpen={isOpen} />
      </div>
    )}
    <div className="workspace-filter-layout-applied-row">
      <div className="workspace-filter-layout-spacer" />
      <div className="workspace-filter-layout-columns" aria-label="Applied filter categories">
        <GenderFilterColumn mode="applied" />
        <DecadeFilterColumn mode="applied" />
        <CultureFilterColumn mode="applied" />
        <LanguageFilterColumn mode="applied" />
      </div>
      <div className="workspace-filter-layout-spacer" />
    </div>
  </div>
);

export default WorkspaceFilterLayout;
