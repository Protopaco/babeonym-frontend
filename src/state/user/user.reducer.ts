import type { UserAction } from '@/models/UserAction';
import type { UserState } from '@/models/UserState';

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, user: action.payload };
    case 'USER_PROVIDER_LOADED':
      return { ...state, userProviderLoaded: true };
    case 'PROMPT_ACCOUNT_CREATION':
      return { ...state, promptAccountCreation: true };
    case 'DISMISS_ACCOUNT_PROMPT':
      return { ...state, promptAccountCreation: false };
    default:
      return state;
  }
};
