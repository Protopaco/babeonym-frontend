import type { UserState, UserAction } from '@/state/user/user.types';

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
