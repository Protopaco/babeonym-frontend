import { useGivenNames, useGivenNamesActions } from '@/state/givenNameProvider';

const NameGenerator = () => {
  const { state } = useGivenNames();
  const { approveCandidate, rejectCandidate, snoozeCandidate } = useGivenNamesActions();
  const { givenNameCandidates } = state;

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
