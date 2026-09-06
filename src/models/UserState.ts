import type { User } from '@/api/generated/models/User';

export type UserState = {
  user: User | null;
  userProviderLoaded: boolean;
  // Opened by a backend signal and closed only by the user. The signal is a
  // trigger, not a render condition, so this stays true until dismissed.
  promptAccountCreation: boolean;
  // The session could not be established at boot. Distinct from having no user
  // yet: userProviderLoaded is set from a finally, so it goes true whether the
  // fetch succeeded or not, and nothing else records which it was.
  sessionLoadFailed: boolean;
};
