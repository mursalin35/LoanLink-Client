import { createBrowserRouter } from "react-router";


import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
     
    ],
  },
]);

export default router;
