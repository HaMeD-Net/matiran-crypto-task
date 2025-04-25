import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "@components/layout";
import PrivateRoute from "./privateRoute";
import { withSuspense } from "@components/withSuspense";

const Home = lazy(() => import("@pages/home"));
const Dashboard = lazy(() => import("@pages/dashboard"));
const NotFound = lazy(() => import("@pages/notFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      {
        path: "/dashboard",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: withSuspense(<Dashboard />),
          },
        ],
      },
      {
        path: "*",
        element: withSuspense(<NotFound />),
      },
    ],
  },
]);
