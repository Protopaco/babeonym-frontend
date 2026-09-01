import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import '@/styles/index.css';

import { UserProvider } from '@/state/user/user.provider';
import { useUser } from '@/state/user/user.context';
import { GivenNameProvider } from '@/state/givenName/givenName.provider';
import { FilterProvider } from '@/state/filter/filter.provider';
import { TutorialProvider } from '@/state/tutorial/tutorial.provider';
import { AppLayoutStateProvider } from '@/state/appLayoutState/appLayoutState.provider';

import { themeRegistry } from './themes/themeRegistry';
import type { ThemeId } from '@/models/ThemeId';

const AppShell = () => {
  const { state } = useUser();

  const storedTheme: ThemeId = (state.user?.theme as ThemeId) ?? 'light';
  const theme = themeRegistry[storedTheme] ?? themeRegistry.light;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <GivenNameProvider>
        <FilterProvider>
          <TutorialProvider>
            <AppLayoutStateProvider>
              <AppShell />
            </AppLayoutStateProvider>
          </TutorialProvider>
        </FilterProvider>
      </GivenNameProvider>
    </UserProvider>
  </StrictMode>
);
