import { useContext, useReducer, useEffect, useMemo, useRef } from 'react';
import { givenNameApi } from '@/api/client';
import type { ReactNode } from 'react';
import { ApiV1GivenNameActionPostRequestNewStateEnum } from '@/api/generated/models/ApiV1GivenNameActionPostRequest';
import type { V1GivenNameActionOperationRequest, V1GivenNameCandidatesRequest } from '@/api/generated/apis/GivenNameApi';
import { GivenNameContext } from '@/state/givenName/givenName.context';
import type { GivenNameState } from '@/state/givenName/givenName.types';
import { givenNameReducer } from '@/state/givenName/givenName.reducer';
import type { Gender } from '@/types/Gender';
import { useUser } from '@/state/user/user.context';

const initialState: GivenNameState = {
  givenNameCandidates: [],
  approvedGivenNames: [],
  givenNameProviderLoaded: false,
  selectedGenders: [],
  selectedDecadeIds: [],
  selectedLanguageIds: [],
  selectedCultureIds: [],
};

export const GivenNameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(givenNameReducer, initialState);
  const {
    state: { user, userProviderLoaded },
  } = useUser();
  const booted = useRef(false);

  const buildCandidateRequest = (
    state: GivenNameState,
    pGenders?: string[],
    pDecades?: number[],
    pLanguages?: number[],
    pCultures?: number[]
  ): V1GivenNameCandidatesRequest => {
    const genders = pGenders?.length ? pGenders.join(',') : state.selectedGenders.length ? state.selectedGenders.join(',') : undefined;

    const decadeIds = pDecades?.length ? pDecades.join(',') : state.selectedDecadeIds.length ? state.selectedDecadeIds.join(',') : undefined;

    const languageIds = pLanguages?.length
      ? pLanguages.join(',')
      : state.selectedLanguageIds.length
        ? state.selectedLanguageIds.join(',')
        : undefined;

    const cultureIds = pCultures?.length ? pCultures.join(',') : state.selectedCultureIds.length ? state.selectedCultureIds.join(',') : undefined;

    return {
      genders,
      decadeIds,
      languageIds,
      cultureIds,
    };
  };

  const getNewCandidates = async (genders?: string[], decades?: number[], languages?: number[], cultures?: number[]) => {
    try {
      const request = buildCandidateRequest(state, genders, decades, languages, cultures);
      const nameList = await givenNameApi.v1GivenNameCandidates(request);
      dispatch({ type: 'GET_NEW_CANDIDATES', payload: nameList });
    } catch (e) {
      throw e;
    }
  };

  const approveCandidate = async (givenCustomNameBridgeId: number) => {
    const actionRequest: V1GivenNameActionOperationRequest = {
      v1GivenNameActionRequest: {
        givenCustomNameBridgeId,
        newState: ApiV1GivenNameActionPostRequestNewStateEnum.Approved,
      },
    };

    try {
      removeCandidate(givenCustomNameBridgeId);
      await givenNameApi.v1GivenNameAction(actionRequest);
      await addApprovedGivenNames();
    } catch (e) {
      throw e;
    }
  };

  const rejectCandidate = async (givenCustomNameBridgeId: number) => {
    const isApprovedName = state.approvedGivenNames.some((approvedGivenName) => approvedGivenName.givenCustomNameBridgeId === givenCustomNameBridgeId);
    const actionRequest: V1GivenNameActionOperationRequest = {
      v1GivenNameActionRequest: {
        givenCustomNameBridgeId,
        newState: ApiV1GivenNameActionPostRequestNewStateEnum.Rejected,
      },
    };

    try {
      removeCandidate(givenCustomNameBridgeId);
      if (isApprovedName) {
        removeApprovedGivenName(givenCustomNameBridgeId);
      }

      await givenNameApi.v1GivenNameAction(actionRequest);
      if (isApprovedName) {
        await addApprovedGivenNames();
      }
    } catch (e) {
      throw e;
    }
  };

  const snoozeCandidate = async (givenCustomNameBridgeId: number) => {
    const actionRequest: V1GivenNameActionOperationRequest = {
      v1GivenNameActionRequest: {
        givenCustomNameBridgeId,
        newState: ApiV1GivenNameActionPostRequestNewStateEnum.Snoozed,
      },
    };

    try {
      removeCandidate(givenCustomNameBridgeId);
      await givenNameApi.v1GivenNameAction(actionRequest);
    } catch (e) {
      throw e;
    }
  };

  const addCustomGivenName = async (customGivenName: string) => {
    const trimmedCustomName = customGivenName.trim();
    if (!trimmedCustomName) return;

    try {
      await givenNameApi.v1GivenNameCustom({
        v1GivenNameCustomRequest: {
          customGivenName: trimmedCustomName,
        },
      });
      await addApprovedGivenNames();
    } catch (e) {
      throw e;
    }
  };

  const removeCandidate = (givenCustomNameBridgeId: number) => {
    dispatch({ type: 'REMOVE_CANDIDATE', payload: givenCustomNameBridgeId });
  };

  const removeApprovedGivenName = (givenCustomNameBridgeId: number) => {
    dispatch({ type: 'REMOVE_APPROVED', payload: givenCustomNameBridgeId });
  };

  const addApprovedGivenNames = async () => {
    const approvedGivenNames = await givenNameApi.v1GivenNameApproved();
    dispatch({ type: 'ADD_APPROVED', payload: approvedGivenNames });
  };

  const givenNameProviderLoaded = async () => {
    dispatch({ type: 'GIVEN_NAME_PROVIDER_LOADED' });
  };

  const addSelectedGenders = (selectedGenders: Gender[]) => {
    dispatch({ type: 'ADD_SELECTED_GENDERS', payload: selectedGenders });
  };

  const removeSelectedGenders = (unselectedGenders: Gender[]) => {
    dispatch({ type: 'REMOVE_SELECTED_GENDERS', payload: unselectedGenders });
  };

  const addSelectedDecadeIds = (selectedDecadeIds: number[]) => {
    dispatch({ type: 'ADD_SELECTED_DECADE_ID', payload: selectedDecadeIds });
  };

  const removeSelectedDecadeIds = (unselectedDecadeIds: number[]) => {
    dispatch({ type: 'REMOVE_SELECTED_DECADE_ID', payload: unselectedDecadeIds });
  };

  const addSelectedLanguageIds = (selectedLanguageIds: number[]) => {
    dispatch({ type: 'ADD_SELECTED_LANGUAGE_ID', payload: selectedLanguageIds });
  };

  const removeSelectedLanguageIds = (unselectedLanguageIds: number[]) => {
    dispatch({ type: 'REMOVE_SELECTED_LANGUAGE_ID', payload: unselectedLanguageIds });
  };

  const addSelectedCultureIds = (selectedCultureIds: number[]) => {
    dispatch({ type: 'ADD_SELECTED_CULTURE_ID', payload: selectedCultureIds });
  };

  const removeSelectedCultureIds = (unselectedCultureIds: number[]) => {
    dispatch({ type: 'REMOVE_SELECTED_CULTURE_ID', payload: unselectedCultureIds });
  };

  useEffect(() => {
    const onLoad = async () => {
      try {
        await getNewCandidates();
        await addApprovedGivenNames();
      } catch (error) {
        console.error('Unable to load given name data.', error);
      } finally {
        givenNameProviderLoaded();
      }
    };

    if (booted.current || !userProviderLoaded || !user) return;
    booted.current = true;
    onLoad();
  }, [userProviderLoaded, user]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      actions: {
        getNewCandidates,
        approveCandidate,
        rejectCandidate,
        snoozeCandidate,
        addCustomGivenName,
        addSelectedGenders,
        removeSelectedGenders,
        addSelectedDecadeIds,
        removeSelectedDecadeIds,
        addSelectedLanguageIds,
        removeSelectedLanguageIds,
        addSelectedCultureIds,
        removeSelectedCultureIds,
      },
    }),
    [state]
  );

  return <GivenNameContext.Provider value={value}>{children}</GivenNameContext.Provider>;
};

export const useGivenNames = () => {
  const context = useContext(GivenNameContext);
  if (!context) {
    throw new Error('useGivenNames must be used inside GivenNamesProvider');
  }
  return context;
};

export const useGivenNamesActions = () => {
  const { actions } = useGivenNames();
  return actions;
};
