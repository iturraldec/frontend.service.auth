import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout/layout';
import ErrorPage from 'components/views/error-page';
import ServiceAuth from 'components/views/service-auth';
import Home from 'components/views/home';
import Dashboard from 'components/views/dashboard';
import Roles from 'components/views/roles';
import Permissions from 'components/views/permissions';
import Users from 'components/views/users';
import Logout from 'components/views/logout';
import getDashboard from './components/router/loaders/getDashboard';
import getPermissions from 'components/router/loaders/getPermissions';

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: getDashboard,
        element: <Dashboard />
      },
      {
        path:"service",
        element: <ServiceAuth />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "dashboard",
        loader: getDashboard,
        element: <Dashboard />
      },
      {
        path:"permissions",
        loader: getPermissions,
        element: <Permissions />
      },
      {
        path:"roles",
        element: <Roles />
      },
      {
        path:"users",
        element: <Users />
      },
      {
        path:"logout",
        element: <Logout />
      }
    ]
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;