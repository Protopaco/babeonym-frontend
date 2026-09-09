import type { LocalStorageKey } from '@/types/LocalStorageKey';

export const LOCAL_STORAGE_KEYS: Record<LocalStorageKey, string> = {
  tutorialEnabled: 'babeonym:tutorialEnabled',
  tutorialLabelDismissed: 'babeonym:tutorialLabelDismissed',
  theme: 'babeonym:theme',
  // Read by the inline script in index.html before React loads, so its name is
  // written out there too. Changing it means changing that script.
  themeBackground: 'babeonym:themeBackground',
};
