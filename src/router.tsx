import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/AppLayout';

import NameWorkspace from '@/pages/NameWorkspace';
import AccountSettings from '@/pages/AccountSettings';
import ThemeTest from '@/pages/ThemeTest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <NameWorkspace /> },
      { path: 'settings', element: <AccountSettings /> },
      { path: 'theme', element: <ThemeTest /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
