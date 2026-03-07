import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useFilters } from '@/state/filter/filter.context';
import FilterDrawer from '@/components/FilterDrawer/FilterDrawer';
import { useState } from 'react';

const NameGenerator = () => {
  const givenNameContext = useGivenNames();
  const { approveCandidate, rejectCandidate, snoozeCandidate } = useGivenNamesActions();
  const { givenNameCandidates } = givenNameContext.state;
  const filterContext = useFilters();
  const { decades } = filterContext.state;
  const [drawerOpen, setDrawerOpen] = useState(true);
  console.log('🚀 ~ NameGenerator ~ drawerOpen:', drawerOpen);

  const approveClick = async () => {
    if (givenNameCandidates && givenNameCandidates.length > 0) {
      await approveCandidate(givenNameCandidates[0].givenCustomNameBridgeId);
    }
  };

  const rejectClick = async () => {
    if (givenNameCandidates && givenNameCandidates.length > 0) {
      await rejectCandidate(givenNameCandidates[0].givenCustomNameBridgeId);
    }
  };

  const snoozeClick = async () => {
    if (givenNameCandidates && givenNameCandidates.length > 0) {
      await snoozeCandidate(givenNameCandidates[0].givenCustomNameBridgeId);
    }
  };

  return (
    <>
      <FilterDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      NameGenerator
      <p>{givenNameCandidates && givenNameCandidates.length > 0 ? givenNameCandidates[0].givenName : 'no names'}</p>
      <p>
        <button onClick={approveClick}>Approve</button>
        <button onClick={rejectClick}>Reject</button>
        <button onClick={snoozeClick}>Snooze</button>
      </p>
    </>
  );
};

export default NameGenerator;
