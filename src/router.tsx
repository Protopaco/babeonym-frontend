import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/AppLayout';

import NameWorkspace from '@/pages/NameWorkspace/NameWorkspace';
import Settings from '@/pages/Settings/Settings';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <NameWorkspace /> },
      { path: 'settings', element: <Settings /> },
      { path: 'error', element: <ErrorPage /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
