import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/AppLayout";

import NameGenerator from "@/pages/NameGenerator";
import NameList from "@/pages/NameList"
import CompareNames from "@/pages/CompareNames"
import AccountSettings from "@/pages/AccountSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <NameGenerator />},
      { path: "list", element: <NameList /> },
      { path: "compare", element: <CompareNames />}, 
      { path: "settings", element: <AccountSettings /> },
    ],
  },
]);

export default router;