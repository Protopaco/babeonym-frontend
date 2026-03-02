import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from '@/state/userProvider.tsx';
import theme from '@/theme';
import './index.css';
import App from './App.tsx';
import { GivenNameProvider } from './state/givenNameProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <GivenNameProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </GivenNameProvider>
    </UserProvider>
  </StrictMode>
);
