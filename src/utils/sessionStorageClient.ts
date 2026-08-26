import { SESSION_STORAGE_KEYS } from '@/constants/sessionStorageKeys';
import type { SessionStorageKey } from '@/types/SessionStorageKey';

const getSessionStorage = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    return window.sessionStorage;
  } catch {
    return undefined;
  }
};

export const sessionStorageClient = {
  getString: (key: SessionStorageKey, fallbackValue: string | null = null) => {
    const storage = getSessionStorage();

    try {
      return storage?.getItem(SESSION_STORAGE_KEYS[key]) ?? fallbackValue;
    } catch {
      return fallbackValue;
    }
  },

  setString: (key: SessionStorageKey, value: string) => {
    const storage = getSessionStorage();

    try {
      storage?.setItem(SESSION_STORAGE_KEYS[key], value);
    } catch {
      // Ignore storage failures so UI state still works in-memory.
    }
  },

  getBoolean: (key: SessionStorageKey, fallbackValue: boolean) => {
    const value = sessionStorageClient.getString(key);

    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    return fallbackValue;
  },

  setBoolean: (key: SessionStorageKey, value: boolean) => {
    sessionStorageClient.setString(key, String(value));
  },

  remove: (key: SessionStorageKey) => {
    const storage = getSessionStorage();
    try {
      storage?.removeItem(SESSION_STORAGE_KEYS[key]);
    } catch {
      // Ignore storage failures so UI state still works in-memory.
    }
  },
};
