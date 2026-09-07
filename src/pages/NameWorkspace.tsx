import NameGenerator from '@/components/NameGenerator/NameGenerator';
import MobileNameFilters from '@/components/NameGenerator/MobileNameFilters/MobileNameFilters';
import CompareNamesMode from '@/components/CompareNames/CompareNamesMode';
import WorkspaceModeContent from '@/components/NameWorkspace/WorkspaceModeContent/WorkspaceModeContent';
import WorkspaceModeHeader from '@/components/NameWorkspace/WorkspaceModeHeader/WorkspaceModeHeader';
import WorkspaceApprovedNames from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNames';
import AccountPromptBanner from '@/components/NameWorkspace/AccountPromptBanner/AccountPromptBanner';
import ExistingAccountNotice from '@/components/NameWorkspace/ExistingAccountNotice/ExistingAccountNotice';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import { useSyncWorkspaceFilterParams } from '@/state/givenName/useSyncWorkspaceFilterParams';
import { useWorkspaceMode } from '@/state/givenName/useWorkspaceMode';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './NameWorkspace.css';

const NameWorkspace = () => {
  const [, setSearchParams] = useSearchParams();
  const { state } = useGivenNames();
  const { approvedGivenNames, givenNameProviderLoaded } = state;

  // Mounted on the page rather than inside either filter surface, so a mobile
  // commit does not depend on the desktop drawer being rendered.
  useSyncWorkspaceFilterParams();
  const { workspaceMode, canCompareNames, shouldClearCompareParam } = useWorkspaceMode();

  // Stays on the page rather than in the hook: the hook is mounted twice, and
  // an effect inside it would try to rewrite the URL from both call sites.
  useEffect(() => {
    if (!shouldClearCompareParam) return;

    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete('mode');
        return nextParams;
      },
      { replace: true }
    );
  }, [shouldClearCompareParam, setSearchParams]);

  const showAddMode = () => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.delete('mode');
      return nextParams;
    });
  };

  const showCompareMode = () => {
    if (!canCompareNames) return;

    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('mode', 'compare');
      return nextParams;
    });
  };

  return (
    <div className="name-workspace">
      <WorkspaceModeHeader
        activeMode={workspaceMode}
        canCompareNames={canCompareNames}
        onAddModeClick={showAddMode}
        onCompareModeClick={showCompareMode}
      />
      <WorkspaceModeContent mode={workspaceMode}>{workspaceMode === 'compare' ? <CompareNamesMode /> : <NameGenerator />}</WorkspaceModeContent>
      {/* Outside WorkspaceModeContent deliberately. The bar is position: fixed,
          and the panes inside that component are transformed as they slide — a
          transformed ancestor is what a fixed descendant measures itself
          against, so rendered in there it left the viewport bottom mid-switch.
          Still generator-only, which is what the mode check is for. */}
      {workspaceMode === 'add' ? <MobileNameFilters isLoading={!givenNameProviderLoaded} /> : null}
      <ExistingAccountNotice />
      <AccountPromptBanner />
      <WorkspaceApprovedNames approvedGivenNames={approvedGivenNames} isLoading={!givenNameProviderLoaded} />
    </div>
  );
};

export default NameWorkspace;
