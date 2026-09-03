import type { User } from '@/api/generated/models/User';

export type UserState = {
  user: User | null;
  userProviderLoaded: boolean;
  // Opened by a backend signal and closed only by the user. The signal is a
  // trigger, not a render condition, so this stays true until dismissed.
  promptAccountCreation: boolean;
};
