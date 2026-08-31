import type { User } from '@/api/generated/models/User';

export type UserState = {
  user: User | null;
  userProviderLoaded: boolean;
};
