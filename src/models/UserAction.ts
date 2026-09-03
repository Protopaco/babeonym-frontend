import type { User } from '@/api/generated/models/User';

export type UserAction =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'USER_PROVIDER_LOADED' }
  | { type: 'PROMPT_ACCOUNT_CREATION' }
  | { type: 'DISMISS_ACCOUNT_PROMPT' };
