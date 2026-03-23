import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/AppLayout';

import NameGenerator from '@/components/NameGenerator/NameGenerator';
import NameList from '@/components/NameList/NameList';
import CompareNames from '@/pages/CompareNames';
import AccountSettings from '@/pages/AccountSettings';
import ThemeTest from '@/pages/ThemeTest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <NameGenerator /> },
      { path: 'list', element: <NameList /> },
      { path: 'compare', element: <CompareNames /> },
      { path: 'settings', element: <AccountSettings /> },
      { path: 'theme', element: <ThemeTest /> },
    ],
  },
]);

export default router;
