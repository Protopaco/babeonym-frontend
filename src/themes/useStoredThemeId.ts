import { useEffect } from 'react';
import { localStorageClient } from '@/utils/localStorageClient';
import { themeRegistry } from '@/themes/themeRegistry';
import type { ThemeId } from '@/models/ThemeId';

const DEFAULT_THEME_ID: ThemeId = 'light';

const isThemeId = (value: string | null | undefined): value is ThemeId => value !== null && value !== undefined && value in themeRegistry;

// Which theme to paint with, and a cache of it for next time.
//
// The user record is the source of truth, but it arrives over the network — so
// until it does the app would paint in the default and then repaint, which is
// the flash of the wrong colours on every load for anyone who is not on light.
// The stored id stands in for that gap, and it is read synchronously, so the
// first paint is already right.
//
// Anything unrecognised falls through to the default: the stored value is
// whatever was in the browser, and a theme could be renamed or removed between
// visits.
const resolveStoredThemeId = (): ThemeId => {
  const storedThemeId = localStorageClient.getString('theme');

  return isThemeId(storedThemeId) ? storedThemeId : DEFAULT_THEME_ID;
};

const useStoredThemeId = (userThemeId: string | null | undefined): ThemeId => {
  const themeId = isThemeId(userThemeId) ? userThemeId : resolveStoredThemeId();

  // The background colour is stored beside the id because index.html paints it
  // before any of this runs, and that script cannot import a theme. Storing the
  // resolved colour rather than writing four hexes into the HTML keeps the
  // palette in one place — the script applies whatever the app last saw.
  useEffect(() => {
    localStorageClient.setString('theme', themeId);
    localStorageClient.setString('themeBackground', themeRegistry[themeId].palette.background.default);
  }, [themeId]);

  return themeId;
};

export default useStoredThemeId;
