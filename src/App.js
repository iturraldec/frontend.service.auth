import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LOGIN, PRIVATE, LOGOUT } from "./config/paths";
import { AuthContextProvider } from "contexts/authContext";
import Home from "views/Home";
import Login from "views/Login";
import Private from "views/Private";
import Logout from "views/Logout";
import PublicRoute from "components/router/PublicRoute";
import PrivateRoute from "components/router/PrivateRoute";

async function getRoles() {
  try {
    const response = await fetch('http://localhost:8000/api/roles', {
                            headers: {
                              'Accept': 'application/json',
                              'Content-type': 'application/json'
                            }
    });
    const data = await response.json();

    return data;
  }
  catch(error) {
    console.error(error);
    return null;
  }
}

const router = createBrowserRouter([
  {
    path: PRIVATE,
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Private />
      },
      {
        path: LOGOUT,
        element: <Logout />
      }
    ]
  },
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: LOGIN,
        loader: getRoles,
        element: <Login />
      }
    ]
  },
  {
    path:'*',
    element: 'Not Found'
  }
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;