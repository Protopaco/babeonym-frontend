import NameGenerator from '@/components/NameGenerator/NameGenerator';
import CompareNamesMode from '@/components/CompareNames/CompareNamesMode';
import WorkspaceModeContent from '@/components/NameWorkspace/WorkspaceModeContent/WorkspaceModeContent';
import WorkspaceModeHeader from '@/components/NameWorkspace/WorkspaceModeHeader/WorkspaceModeHeader';
import WorkspaceApprovedNames from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNames';
import AccountPromptBanner from '@/components/NameWorkspace/AccountPromptBanner/AccountPromptBanner';
import ExistingAccountNotice from '@/components/NameWorkspace/ExistingAccountNotice/ExistingAccountNotice';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import { useSyncWorkspaceFilterParams } from '@/state/givenName/useSyncWorkspaceFilterParams';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './NameWorkspace.css';

const NameWorkspace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useGivenNames();
  const { approvedGivenNames, givenNameProviderLoaded } = state;

  // Mounted on the page rather than inside either filter surface, so a mobile
  // commit does not depend on the desktop drawer being rendered.
  useSyncWorkspaceFilterParams();
  const compareModeRequested = searchParams.get('mode') === 'compare';
  const canCompareNames = givenNameProviderLoaded && approvedGivenNames.length >= 2;
  const workspaceMode = compareModeRequested && canCompareNames ? 'compare' : 'add';

  useEffect(() => {
    if (!givenNameProviderLoaded || !compareModeRequested || canCompareNames) return;

    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete('mode');
        return nextParams;
      },
      { replace: true }
    );
  }, [canCompareNames, compareModeRequested, givenNameProviderLoaded, setSearchParams]);

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
