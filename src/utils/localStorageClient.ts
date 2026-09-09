import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';
import type { LocalStorageKey } from '@/types/LocalStorageKey';

// localStorage rather than sessionStorage: sessionStorage is scoped to one tab
// and dies with it, so a preference stored there is gone on the next visit and
// absent in a second tab. Everything kept here is a preference meant to outlive
// the tab it was set in.
const getLocalStorage = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};

export const localStorageClient = {
  getString: (key: LocalStorageKey, fallbackValue: string | null = null) => {
    const storage = getLocalStorage();

    try {
      return storage?.getItem(LOCAL_STORAGE_KEYS[key]) ?? fallbackValue;
    } catch {
      return fallbackValue;
    }
  },

  setString: (key: LocalStorageKey, value: string) => {
    const storage = getLocalStorage();

    try {
      storage?.setItem(LOCAL_STORAGE_KEYS[key], value);
    } catch {
      // Ignore storage failures so UI state still works in-memory.
    }
  },

  getBoolean: (key: LocalStorageKey, fallbackValue: boolean) => {
    const value = localStorageClient.getString(key);

    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    return fallbackValue;
  },

  setBoolean: (key: LocalStorageKey, value: boolean) => {
    localStorageClient.setString(key, String(value));
  },

  remove: (key: LocalStorageKey) => {
    const storage = getLocalStorage();
    try {
      storage?.removeItem(LOCAL_STORAGE_KEYS[key]);
    } catch {
      // Ignore storage failures so UI state still works in-memory.
    }
  },
};
