import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
       // { path: "/", element: <NameGenerator />},
      // { path: "list", element: <NameList /> },
      // {path: "compare", element: <Compare />}, 
      //{ path: "settings", element: <ApprovedPage /> },
    ],
  },
]);

export default router;