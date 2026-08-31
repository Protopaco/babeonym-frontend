import type { UserAction } from '@/models/UserAction';
import type { UserState } from '@/models/UserState';

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, user: action.payload };
    case 'USER_PROVIDER_LOADED':
      return { ...state, userProviderLoaded: true };
    default:
      return state;
  }
};
