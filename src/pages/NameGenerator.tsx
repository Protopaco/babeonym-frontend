import { useGivenNames, useGivenNamesActions } from '@/state/givenNameProvider';
import { useFilters } from '@/state/filter/filter.context';

const NameGenerator = () => {
  const givenNameContext = useGivenNames();
  const { approveCandidate, rejectCandidate, snoozeCandidate } = useGivenNamesActions();
  const { givenNameCandidates } = givenNameContext.state;
  const filterContext = useFilters();
  const { decades } = filterContext.state;
  console.log('🚀 ~ NameGenerator ~ decades:', decades);

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
