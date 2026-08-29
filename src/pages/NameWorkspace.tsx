import NameGenerator from '@/components/NameGenerator/NameGenerator';
import CompareNamesMode from '@/components/CompareNames/CompareNamesMode';
import WorkspaceModeHeader from '@/components/NameWorkspace/WorkspaceModeHeader/WorkspaceModeHeader';
import WorkspaceApprovedNames from '@/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNames';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './NameWorkspace.css';

const NameWorkspace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useGivenNames();
  const { approvedGivenNames, givenNameProviderLoaded } = state;
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
      <div className="name-workspace-active-mode">
        {workspaceMode === 'compare' ? <CompareNamesMode /> : <NameGenerator />}
      </div>
      <WorkspaceApprovedNames approvedGivenNames={approvedGivenNames} isLoading={!givenNameProviderLoaded} />
    </div>
  );
};

export default NameWorkspace;
