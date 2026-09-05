import { useContext, useReducer, useEffect, useMemo, useRef } from 'react';
import { givenNameApi } from '@/api/client';
import type { ReactNode } from 'react';
import type { GivenName } from '@/api/generated/models/GivenName';
import type { GivenNameMutationResponse } from '@/api/generated/models/GivenNameMutationResponse';
import { V1GivenNameActionRequestNewStateEnum } from '@/api/generated/models/V1GivenNameActionRequest';
import type { V1GivenNameActionOperationRequest, V1GivenNameCandidatesRequest } from '@/api/generated/apis/GivenNameApi';
import { GivenNameContext } from '@/state/givenName/givenName.context';
import type { GivenNameState, SelectedNameFilters } from '@/state/givenName/givenName.types';
import { givenNameReducer } from '@/state/givenName/givenName.reducer';
import { initialGivenNameState } from '@/state/givenName/givenName.initialState';
import enqueueRequest from '@/utils/enqueueRequest';
import { parseFilterIds } from '@/utils/parseFilterIds';
import { serializeFilterIds } from '@/utils/serializeFilterIds';
import retryRequest from '@/utils/retryRequest';
import { useUser } from '@/state/user/user.context';

// The queue is topped up before it can empty, so the floor is the threshold
// minus whatever is consumed while a refill is in flight, not zero.
const CANDIDATE_REFILL_THRESHOLD = 25;
const CANDIDATE_BATCH_SIZE = 50;

export const GivenNameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(givenNameReducer, initialGivenNameState);
  const {
    state: { user, userProviderLoaded },
    dispatch: userDispatch,
  } = useUser();
  // Holds which user was booted rather than merely that a boot happened. Theme
  // and settings saves dispatch ADD_USER with a fresh object, so the effect
  // wakes on every one of them; only a different id means a different person.
  const bootedUserId = useRef<number | null>(null);
  const refillInFlight = useRef(false);

  // The backend matches milestones exactly, so the signal is true on one
  // response only. Every mutation that can move the action count has to read it,
  // including snooze, which otherwise has no use for the response.
  const applyAccountPromptSignal = (response: GivenNameMutationResponse) => {
    if (!response.user.promptAccountCreation) return;
    userDispatch({ type: 'PROMPT_ACCOUNT_CREATION' });
  };

  const buildCandidateRequest = (
    state: GivenNameState,
    pGenders?: number[],
    pDecades?: number[],
    pLanguages?: number[],
    pCultures?: number[]
  ): V1GivenNameCandidatesRequest => {
    // Presence, not length. An empty array is the caller saying this category
    // has no filter, which is what deleting the last chip of one produces.
    // Treating it as "nothing passed" would fall back to state and re-apply the
    // filter that was just removed.
    const genderIds = pGenders ? serializeFilterIds(pGenders) : serializeFilterIds(state.selectedGenderIds);

    const decadeIds = pDecades ? serializeFilterIds(pDecades) : serializeFilterIds(state.selectedDecadeIds);

    const languageIds = pLanguages ? serializeFilterIds(pLanguages) : serializeFilterIds(state.selectedLanguageIds);

    const cultureIds = pCultures ? serializeFilterIds(pCultures) : serializeFilterIds(state.selectedCultureIds);

    return {
      genderIds,
      decadeIds,
      languageIds,
      cultureIds,
    };
  };

  const getNewCandidates = async (genderIds?: number[], decades?: number[], languages?: number[], cultures?: number[]) => {
    try {
      const request = buildCandidateRequest(state, genderIds, decades, languages, cultures);
      const nameList = await givenNameApi.v1GivenNameCandidates(request);
      dispatch({ type: 'GET_NEW_CANDIDATES', payload: nameList });
    } catch (e) {
      throw e;
    }
  };

  // The dispatch has not landed by the time the fetch is built, so the ids are
  // passed through rather than read back off state.
  const applyFilters = async (filters: SelectedNameFilters) => {
    const { genderIds, decadeIds, languageIds, cultureIds } = filters;
    dispatch({ type: 'SET_SELECTED_FILTERS', payload: filters });

    try {
      await getNewCandidates(genderIds, decadeIds, languageIds, cultureIds);
    } catch (error) {
      // The queue the user already has still matches the previous filters, so
      // leaving it in place is the safer failure.
      console.error('Unable to apply name filters.', error);
    }
  };

  // Tops the queue up before it can run out. The names already held are sent as
  // exclusions because only names the user has acted on carry a state row, so
  // the backend would otherwise hand the same ones back.
  const refillCandidates = async () => {
    if (refillInFlight.current) return;
    refillInFlight.current = true;

    try {
      const request = buildCandidateRequest(state);
      const nameList = await givenNameApi.v1GivenNameCandidates({
        ...request,
        limit: CANDIDATE_BATCH_SIZE,
        excludeBridgeIds: state.givenNameCandidates.map(({ givenCustomNameBridgeId }) => givenCustomNameBridgeId).join(','),
      });
      dispatch({ type: 'ADD_CANDIDATES', payload: nameList });
    } catch (error) {
      // The user still has names in hand, so a failed top-up is not worth
      // reporting. The next action that shortens the queue tries again.
      console.error('Unable to refill given name candidates.', error);
    } finally {
      refillInFlight.current = false;
    }
  };

  const approveCandidate = async (givenCustomNameBridgeId: number) => {
    const actionRequest: V1GivenNameActionOperationRequest = {
      v1GivenNameActionRequest: {
        givenCustomNameBridgeId,
        newState: V1GivenNameActionRequestNewStateEnum.Approved,
      },
    };

    const candidate = findCandidate(givenCustomNameBridgeId);

    try {
      removeCandidate(givenCustomNameBridgeId);
      // The action upserts the state, so replaying it is safe.
      const response = await enqueueRequest(() => retryRequest(() => givenNameApi.v1GivenNameAction(actionRequest)));
      dispatch({ type: 'ADD_APPROVED', payload: response.approvedGivenNames });
      applyAccountPromptSignal(response);
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
        newState: V1GivenNameActionRequestNewStateEnum.Rejected,
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

      const response = await enqueueRequest(() => retryRequest(() => givenNameApi.v1GivenNameAction(actionRequest)));
      dispatch({ type: 'ADD_APPROVED', payload: response.approvedGivenNames });
      applyAccountPromptSignal(response);
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
        newState: V1GivenNameActionRequestNewStateEnum.Snoozed,
      },
    };

    const candidate = findCandidate(givenCustomNameBridgeId);

    try {
      removeCandidate(givenCustomNameBridgeId);
      const response = await retryRequest(() => givenNameApi.v1GivenNameAction(actionRequest));
      applyAccountPromptSignal(response);
    } catch (error) {
      restoreCandidate(candidate);
      console.error('Unable to snooze given name.', error);
    }
  };

  const addCustomGivenName = async (customGivenName: string) => {
    const trimmedCustomName = customGivenName.trim();
    if (!trimmedCustomName) return;

    try {
      const response = await enqueueRequest(() =>
        retryRequest(() =>
          givenNameApi.v1GivenNameCustom({
            v1GivenNameCustomRequest: {
              customGivenName: trimmedCustomName,
            },
          })
        )
      );
      dispatch({ type: 'ADD_APPROVED', payload: response.approvedGivenNames });
      applyAccountPromptSignal(response);
    } catch (e) {
      throw e;
    }
  };

  const findCandidate = (givenCustomNameBridgeId: number) =>
    state.givenNameCandidates.find((candidate) => candidate.givenCustomNameBridgeId === givenCustomNameBridgeId);

  // Never retried: a comparison adds to the existing ratings rather than setting
  // them, so replaying a vote whose response was lost would count it twice.
  const submitCompareVote = async (winnerId: number, loserId: number) => {
    try {
      const response = await enqueueRequest(() =>
        givenNameApi.v1GivenNameCompare({
          v1GivenNameCompareRequest: { winnerId, loserId },
        })
      );
      dispatch({ type: 'ADD_APPROVED', payload: response.approvedGivenNames });
      applyAccountPromptSignal(response);
    } catch (error) {
      console.error('Failed to submit compare vote', error);
    }
  };

  // Applied on its own, without a request, so every drag lands on screen
  // immediately. The write is separate and debounced by the caller, since
  // someone rearranging a list usually moves several names in a row.
  const reorderApprovedGivenNames = (reorderedGivenNames: GivenName[]) => {
    dispatch({ type: 'REORDER_APPROVED', payload: reorderedGivenNames });
  };

  // Not retried: the request sets an absolute order rather than adjusting the
  // current one, so replaying a lost write could let a stale order overwrite a
  // newer one. The caller passes the order to fall back to, captured before the
  // first drag of the run rather than read from state here, which by now holds
  // the optimistic order this is trying to undo.
  const saveApprovedGivenNamesOrder = async (reorderedGivenNames: GivenName[], previousGivenNames: GivenName[]) => {
    try {
      const response = await enqueueRequest(() =>
        givenNameApi.v1GivenNameOrder({
          v1GivenNameOrderRequest: {
            givenCustomNameBridgeIds: reorderedGivenNames.map(({ givenCustomNameBridgeId }) => givenCustomNameBridgeId),
          },
        })
      );
      // Replaced with the server's copy rather than left as the optimistic one,
      // so the ratings the respace just wrote are the ones held locally.
      dispatch({ type: 'ADD_APPROVED', payload: response.approvedGivenNames });
      applyAccountPromptSignal(response);
    } catch (error) {
      dispatch({ type: 'REORDER_APPROVED', payload: previousGivenNames });
      console.error('Unable to reorder given names.', error);
    }
  };

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

  useEffect(() => {
    const onLoad = async () => {
      // This provider sits outside the router, so the initial filters are read
      // off the location directly. Without it, opening a URL that carries
      // filters would boot an unfiltered queue and race the sync hook.
      const bootParams = new URLSearchParams(window.location.search);

      try {
        // applyFilters rather than a bare fetch, so the ids land in state and
        // later refills keep asking for the same filtered pool.
        await applyFilters({
          genderIds: parseFilterIds(bootParams, 'genders'),
          decadeIds: parseFilterIds(bootParams, 'decades'),
          languageIds: parseFilterIds(bootParams, 'languages'),
          cultureIds: parseFilterIds(bootParams, 'cultures'),
        });
        await addApprovedGivenNames();
      } catch (error) {
        console.error('Unable to load given name data.', error);
      } finally {
        givenNameProviderLoaded();
      }
    };

    if (!userProviderLoaded || !user) return;
    if (bootedUserId.current === user.id) return;
    bootedUserId.current = user.id;
    onLoad();
  }, [userProviderLoaded, user]);

  // Watching the length rather than calling from each action keeps every path
  // that shortens the queue covered, including a filter change that returns a
  // short list.
  useEffect(() => {
    if (!state.givenNameProviderLoaded) return;
    // Nothing but a filter change can produce names once the pool is spent, and
    // every action shortens the queue, so without this each one would fire
    // another refill that cannot return anything.
    if (state.candidatesExhausted) return;
    if (state.givenNameCandidates.length >= CANDIDATE_REFILL_THRESHOLD) return;
    refillCandidates();
  }, [state.givenNameCandidates.length, state.givenNameProviderLoaded, state.candidatesExhausted]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      actions: {
        getNewCandidates,
        applyFilters,
        approveCandidate,
        rejectCandidate,
        snoozeCandidate,
        submitCompareVote,
        addCustomGivenName,
        reorderApprovedGivenNames,
        saveApprovedGivenNamesOrder,
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
