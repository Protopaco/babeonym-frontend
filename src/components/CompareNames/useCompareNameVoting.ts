import type { GivenName } from '@/api/generated';
import type { ComparePair } from '@/components/CompareNames/compareNames.types';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';

export const useCompareNameVoting = (currentPair: ComparePair | null, advancePair: () => void) => {
  const { submitCompareVote } = useGivenNamesActions();

  const voteForName = (winner: GivenName) => {
    if (!currentPair) {
      return;
    }

    const loser = winner.givenCustomNameBridgeId === currentPair.left.givenCustomNameBridgeId ? currentPair.right : currentPair.left;

    advancePair();

    submitCompareVote(winner.givenCustomNameBridgeId, loser.givenCustomNameBridgeId);
  };

  return {
    voteForName,
  };
};
