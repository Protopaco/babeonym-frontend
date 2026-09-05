import { useEffect, useRef } from 'react';
import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';

// Long enough that a run of drags settles into one write, short enough that the
// order is saved before attention moves on. Someone rearranging a list usually
// moves several names, so writing on every drop would send a request per move
// and let an earlier one land after a later one.
const REORDER_WRITE_DELAY_MS = 1000;

export const useApprovedNamesReorder = (approvedGivenNames: GivenName[]) => {
  const { reorderApprovedGivenNames, saveApprovedGivenNamesOrder } = useGivenNamesActions();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  // Held in a ref rather than passed through the timer, so a drag during the
  // delay replaces the pending order instead of queueing a second write.
  const pendingOrderRef = useRef<GivenName[]>(null);
  // Captured at the start of a run of drags, not per drag, so a failed write
  // rolls back to the last order the server confirmed rather than to a
  // half-finished arrangement partway through the run.
  const rollbackOrderRef = useRef<GivenName[]>(null);

  const writePendingOrder = () => {
    const pendingOrder = pendingOrderRef.current;
    const rollbackOrder = rollbackOrderRef.current;
    pendingOrderRef.current = null;
    rollbackOrderRef.current = null;
    if (pendingOrder && rollbackOrder) saveApprovedGivenNamesOrder(pendingOrder, rollbackOrder);
  };

  // Kept in a ref so the unmount effect can flush the latest pending order
  // without re-running every time that order changes. Assigned in an effect
  // rather than during render, which React does not allow.
  const writePendingOrderRef = useRef(writePendingOrder);
  useEffect(() => {
    writePendingOrderRef.current = writePendingOrder;
  });

  // Flushed on unmount so a reorder is not lost by navigating away inside the
  // delay. Leaving the page is not a reason to discard what the user arranged.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      writePendingOrderRef.current();
    };
  }, []);

  const reorder = (reorderedGivenNames: GivenName[]) => {
    if (!rollbackOrderRef.current) rollbackOrderRef.current = approvedGivenNames;
    pendingOrderRef.current = reorderedGivenNames;
    reorderApprovedGivenNames(reorderedGivenNames);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(writePendingOrder, REORDER_WRITE_DELAY_MS);
  };

  return { reorder };
};
