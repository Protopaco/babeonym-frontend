import { useContext, useReducer, useEffect, useMemo, useRef } from 'react';
import { givenNameApi } from '@/api/client';
import type { ReactNode } from 'react';
import type { GivenName } from '@/api/generated/models/GivenName';
import { ApiV1GivenNameActionPostRequestNewStateEnum } from '@/api/generated/models/ApiV1GivenNameActionPostRequest';
import type { V1GivenNameActionOperationRequest, V1GivenNameCandidatesRequest } from '@/api/generated/apis/GivenNameApi';
import { GivenNameContext } from '@/state/givenName/givenName.context';
import type { GivenNameState } from '@/state/givenName/givenName.types';
import { givenNameReducer } from '@/state/givenName/givenName.reducer';
import type { Gender } from '@/types/Gender';
import enqueueRequest from '@/utils/enqueueRequest';
import retryRequest from '@/utils/retryRequest';
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

    const candidate = findCandidate(givenCustomNameBridgeId);

    try {
      removeCandidate(givenCustomNameBridgeId);
      // The action upserts the state, so replaying it is safe.
      const { approvedGivenNames } = await enqueueRequest(() => retryRequest(() => givenNameApi.v1GivenNameAction(actionRequest)));
      dispatch({ type: 'ADD_APPROVED', payload: approvedGivenNames });
    } catch (error) {
      // Nothing downstream handles this, so putting the card back is the way the
      // failure is reported.
      restoreCandidate(candidate);
      console.error('Unable to approve given name.', error);
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

    const candidate = findCandidate(givenCustomNameBridgeId);
    const approvedIndex = state.approvedGivenNames.findIndex(
      (approvedGivenName) => approvedGivenName.givenCustomNameBridgeId === givenCustomNameBridgeId
    );
    const approvedGivenName = state.approvedGivenNames[approvedIndex];

    try {
      removeCandidate(givenCustomNameBridgeId);
      if (isApprovedName) {
        removeApprovedGivenName(givenCustomNameBridgeId);
      }

      const { approvedGivenNames } = await enqueueRequest(() => retryRequest(() => givenNameApi.v1GivenNameAction(actionRequest)));
      dispatch({ type: 'ADD_APPROVED', payload: approvedGivenNames });
    } catch (error) {
      restoreCandidate(candidate);
      if (isApprovedName) {
        dispatch({ type: 'RESTORE_APPROVED', payload: { givenName: approvedGivenName, index: approvedIndex } });
      }
      console.error('Unable to reject given name.', error);
    }
  };

  const snoozeCandidate = async (givenCustomNameBridgeId: number) => {
    const actionRequest: V1GivenNameActionOperationRequest = {
      v1GivenNameActionRequest: {
        givenCustomNameBridgeId,
        newState: ApiV1GivenNameActionPostRequestNewStateEnum.Snoozed,
      },
    };

    const candidate = findCandidate(givenCustomNameBridgeId);

    try {
      removeCandidate(givenCustomNameBridgeId);
      await retryRequest(() => givenNameApi.v1GivenNameAction(actionRequest));
    } catch (error) {
      restoreCandidate(candidate);
      console.error('Unable to snooze given name.', error);
    }
  };

  const addCustomGivenName = async (customGivenName: string) => {
    const trimmedCustomName = customGivenName.trim();
    if (!trimmedCustomName) return;

    try {
      const { approvedGivenNames } = await enqueueRequest(() =>
        retryRequest(() =>
          givenNameApi.v1GivenNameCustom({
            v1GivenNameCustomRequest: {
              customGivenName: trimmedCustomName,
            },
          })
        )
      );
      dispatch({ type: 'ADD_APPROVED', payload: approvedGivenNames });
    } catch (e) {
      throw e;
    }
  };

  const findCandidate = (givenCustomNameBridgeId: number) =>
    state.givenNameCandidates.find((candidate) => candidate.givenCustomNameBridgeId === givenCustomNameBridgeId);

  const removeCandidate = (givenCustomNameBridgeId: number) => {
    dispatch({ type: 'REMOVE_CANDIDATE', payload: givenCustomNameBridgeId });
  };

  // Rejecting from the approved list acts on a name that was never a candidate,
  // so there is nothing to put back.
  const restoreCandidate = (candidate?: GivenName) => {
    if (!candidate) return;
    dispatch({ type: 'RESTORE_CANDIDATE', payload: candidate });
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
