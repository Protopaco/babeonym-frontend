import { createContext } from 'react';
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
        addSelectedGenderIds: (selectedGenderIds: number[]) => void;
        removeSelectedGenderIds: (unselectedGenderIds: number[]) => void;
        addSelectedDecadeIds: (selectedDecadeIds: number[]) => void;
        removeSelectedDecadeIds: (unselectedDecadeIds: number[]) => void;
        addSelectedLanguageIds: (selectedLanguageIds: number[]) => void;
        removeSelectedLanguageIds: (unselectedLanguageIds: number[]) => void;
        addSelectedCultureIds: (selectedCultureIds: number[]) => void;
        removeSelectedCultureIds: (unselectedCultureIds: number[]) => void;
      };
    }
  | undefined
>(undefined);
