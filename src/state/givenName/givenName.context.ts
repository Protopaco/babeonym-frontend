import { createContext } from 'react';
import type { GivenNameState, GivenNameAction } from '@/state/givenName/givenName.types';
import type { Gender } from '@/types/Gender';

export const GivenNameContext = createContext<
  | {
      state: GivenNameState;
      dispatch: React.Dispatch<GivenNameAction>;
      actions: {
        getNewCandidates: (genders?: string[], decades?: number[], languages?: number[], cultures?: number[]) => Promise<void>;
        approveCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        rejectCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        snoozeCandidate: (givenCustomNameBridgeId: number) => Promise<void>;
        addCustomGivenName: (customGivenName: string) => Promise<void>;
        addSelectedGenders: (selectedGender: Gender[]) => void;
        removeSelectedGenders: (unselectedGender: Gender[]) => void;
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
