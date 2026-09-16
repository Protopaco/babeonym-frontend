import { useRef } from 'react';
import type { GivenName } from '@/api/generated';
import type { ComparePair } from '@/components/CompareNamesMode/compareNames.types';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';

// A vote swaps the next pair in on the following frame, so there is no load to
// wait through — but the new chips mount in the same place the old ones were,
// and a second tap arriving during the drop lands on a name the user has not
// seen yet. Votes inside this window are dropped.
//
// Not a motion value, which is why it is a plain number rather than a token:
// what it measures is how long after a tap a second tap is presumed accidental.
// 500ms is roughly the platform double-click interval, which is the behaviour
// actually being guarded against. Matching the drop animation was tried first
// and let pairs through, because a double-click routinely outlasts it. The
// generator's action lock is the same number for the same reason.
const VOTE_LOCK_MS = 500;

export const useCompareNameVoting = (currentPair: ComparePair | null, advancePair: () => void) => {
  const { submitCompareVote } = useGivenNamesActions();

  // A ref rather than state: the lock changes nothing on screen, and a render
  // for it would land in the middle of the animation it exists to protect.
  const lastVoteAtMs = useRef(0);

  // Returns whether the vote was taken, so the chip knows whether to show
  // itself as chosen.
  const voteForName = (winner: GivenName): boolean => {
    if (!currentPair) {
      return false;
    }

    const nowMs = Date.now();

    if (nowMs - lastVoteAtMs.current < VOTE_LOCK_MS) {
      return false;
    }

    lastVoteAtMs.current = nowMs;

    const loser = winner.givenCustomNameBridgeId === currentPair.left.givenCustomNameBridgeId ? currentPair.right : currentPair.left;

    advancePair();

    submitCompareVote(winner.givenCustomNameBridgeId, loser.givenCustomNameBridgeId);

    return true;
  };

  return {
    voteForName,
  };
};
