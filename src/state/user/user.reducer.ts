import type { UserAction } from '@/models/UserAction';
import type { UserState } from '@/models/UserState';

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    // Clears the failure as well as setting the user. A retry that succeeds
    // must not leave the app redirecting to the error page.
    case 'ADD_USER':
      return { ...state, user: action.payload, sessionLoadFailed: false };
    case 'USER_PROVIDER_LOADED':
      return { ...state, userProviderLoaded: true };
    case 'USER_LOAD_FAILED':
      return { ...state, sessionLoadFailed: true };
    case 'PROMPT_ACCOUNT_CREATION':
      return { ...state, promptAccountCreation: true };
    case 'DISMISS_ACCOUNT_PROMPT':
      return { ...state, promptAccountCreation: false };
    default:
      return state;
  }
};
