import type { GivenName } from '@/api/generated';
import { givenNameApi } from '@/api/client';
import type { ComparePair } from '@/components/CompareNames/compareNames.types';

export const useCompareNameVoting = (currentPair: ComparePair | null, advancePair: () => void) => {
  const voteForName = (winner: GivenName) => {
    if (!currentPair) {
      return;
    }

    const loser = winner.givenCustomNameBridgeId === currentPair.left.givenCustomNameBridgeId ? currentPair.right : currentPair.left;

    advancePair();

    givenNameApi
      .v1GivenNameCompare({
        v1GivenNameCompareRequest: {
          winnerId: winner.givenCustomNameBridgeId,
          loserId: loser.givenCustomNameBridgeId,
        },
      })
      .catch((error) => {
        console.error('Failed to submit compare vote', error);
      });
  };

  return {
    voteForName,
  };
};
