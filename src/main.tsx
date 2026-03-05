import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { UserProvider } from '@/state/user/user.provider';
import theme from '@/theme';
import './index.css';
import App from './App.tsx';
import { GivenNameProvider } from '@/state/givenName/givenName.provider.tsx';
import { FilterProvider } from '@/state/filter/filter.provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <GivenNameProvider>
        <FilterProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </FilterProvider>
      </GivenNameProvider>
    </UserProvider>
  </StrictMode>
);
