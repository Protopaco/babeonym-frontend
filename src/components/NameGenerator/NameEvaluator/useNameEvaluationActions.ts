import { useRef } from 'react';
import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/useGivenNamesActions';

// Each action drops the candidate from the queue before it awaits the request,
// so the next name is on screen the following frame and the round trip happens
// behind it. A second tap arriving during the drop acts on a name the user has
// not read yet, and it does not have to be the same button — approve then
// reject lands just as easily as approve twice. Actions inside this window are
// dropped.
//
// Not a motion value, which is why it is a plain number rather than a token:
// what it measures is how long after a tap a second tap is presumed accidental.
// 500ms is roughly the platform double-click interval, which is the behaviour
// actually being guarded against. Matching the drop animation was tried first
// and let pairs through, because a double-click routinely outlasts it.
//
// The three actions share one timestamp for the same reason the window exists
// at all: what is being guarded is the name, not the button.
const ACTION_LOCK_MS = 500;

export const useNameEvaluationActions = (currentCandidate: GivenName | null) => {
  const { approveCandidate, rejectCandidate, snoozeCandidate } = useGivenNamesActions();

  // A ref rather than state: the lock changes nothing on screen, and a render
  // for it would land in the middle of the animation it exists to protect.
  const lastActionAtMs = useRef(0);

  // Checked before any await, so the guard closes on the tap rather than on the
  // response.
  const claimActionWindow = () => {
    const nowMs = Date.now();

    if (nowMs - lastActionAtMs.current < ACTION_LOCK_MS) {
      return false;
    }

    lastActionAtMs.current = nowMs;

    return true;
  };

  const approveClick = async () => {
    if (currentCandidate && claimActionWindow()) {
      await approveCandidate(currentCandidate.givenCustomNameBridgeId);
    }
  };

  const rejectClick = async () => {
    if (currentCandidate && claimActionWindow()) {
      await rejectCandidate(currentCandidate.givenCustomNameBridgeId);
    }
  };

  const snoozeClick = async () => {
    if (currentCandidate && claimActionWindow()) {
      await snoozeCandidate(currentCandidate.givenCustomNameBridgeId);
    }
  };

  return {
    approveClick,
    rejectClick,
    snoozeClick,
  };
};
