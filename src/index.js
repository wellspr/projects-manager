import "./sass/main.scss";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Create from "./Pages/Create";
import Edit from "./Pages/Edit";
import { projects } from "./api";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const response = await projects.getProjects();
      return response.data;
    },
    element: <Home />
  },
  {
    path: "/create",
    element: <Create />
  },
  {
    path: "/edit/:id",
    loader: async ({ params }) => {
      const response = await projects.getProject(params.id);
      return response.data;
    },
    element: <Edit />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
