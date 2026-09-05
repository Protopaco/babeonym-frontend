import { createContext } from 'react';
import type { GivenName } from '@/api/generated';
import type { GivenNameState, GivenNameAction, SelectedNameFilters } from '@/state/givenName/givenName.types';

export const GivenNameContext = createContext<
  | {
      state: GivenNameState;
      dispatch: React.Dispatch<GivenNameAction>;
      actions: {
        getNewCandidates: (genderIds?: number[], decades?: number[], languages?: number[], cultures?: number[]) => Promise<void>;
        applyFilters: (filters: SelectedNameFilters) => Promise<void>;
        approveCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        rejectCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        snoozeCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        submitCompareVote: (winnerId: number, loserId: number) => Promise<void>;
        addCustomGivenName: (customGivenName: string) => Promise<void>;
        reorderApprovedGivenNames: (reorderedGivenNames: GivenName[]) => void;
        saveApprovedGivenNamesOrder: (reorderedGivenNames: GivenName[], previousGivenNames: GivenName[]) => Promise<void>;
      };
    }
  | undefined
>(undefined);
