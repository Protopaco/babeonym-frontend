import NameGenerator from '@/components/NameGenerator/NameGenerator';
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
      <WorkspaceModeContent>
        {workspaceMode === 'compare' ? <CompareNamesMode /> : <NameGenerator />}
      </WorkspaceModeContent>
      <ExistingAccountNotice />
      <AccountPromptBanner />
      <WorkspaceApprovedNames approvedGivenNames={approvedGivenNames} isLoading={!givenNameProviderLoaded} />
    </div>
  );
};

export default NameWorkspace;
