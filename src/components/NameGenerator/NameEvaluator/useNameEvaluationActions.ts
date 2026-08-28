import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';

export const useNameEvaluationActions = (currentCandidate: GivenName | null) => {
  const { approveCandidate, rejectCandidate, snoozeCandidate } = useGivenNamesActions();

  const approveClick = async () => {
    if (currentCandidate) {
      await approveCandidate(currentCandidate.givenCustomNameBridgeId);
    }
  };

  const rejectClick = async () => {
    if (currentCandidate) {
      await rejectCandidate(currentCandidate.givenCustomNameBridgeId);
    }
  };

  const snoozeClick = async () => {
    if (currentCandidate) {
      await snoozeCandidate(currentCandidate.givenCustomNameBridgeId);
    }
  };

  return {
    approveClick,
    rejectClick,
    snoozeClick,
  };
};
