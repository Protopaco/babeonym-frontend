import { createContext } from 'react';
import type { GivenNameState, GivenNameAction } from '@/state/givenName/givenName.types';
import type { Gender } from '@/types/Gender';

export const GivenNameContext = createContext<
  | {
      state: GivenNameState;
      dispatch: React.Dispatch<GivenNameAction>;
      actions: {
        getNewCandidates: () => Promise<void>;
        approveCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        rejectCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        snoozeCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        addSelectedGender: (selectedGender: Gender) => Promise<void>;
        removeSelectedGender: (unselectedGender: Gender) => Promise<void>;
        addSelectedDecadeIds: (selectedDecadeIds: number[]) => Promise<void>;
        removeSelectedDecadeIds: (unselectedDecadeIds: number[]) => Promise<void>;
      };
    }
  | undefined
>(undefined);
