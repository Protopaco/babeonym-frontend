import { createContext } from 'react';
import type { GivenNameState, GivenNameAction } from '@/state/givenName/givenName.types';

export const GivenNameContext = createContext<
  | {
      state: GivenNameState;
      dispatch: React.Dispatch<GivenNameAction>;
      actions: {
        approveCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        rejectCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        snoozeCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
      };
    }
  | undefined
>(undefined);
