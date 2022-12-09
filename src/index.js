// Sass - scss
import "./sass/main.scss";

// React & ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import Create from "./Pages/Create";
import Edit from "./Pages/Edit";
import Response from "./Pages/Response";
import Error from "./Pages/Error";

// API
import { auth, projects } from "./api";


const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const response = await projects.getProjects();
      return response.data;
    },
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: "/create",
    element: <Create />,
    errorElement: <Error />
  },
  {
    path: "/edit/:id",
    loader: async ({ params }) => {
      const response = await projects.getProject(params.id);
      return response.data;
    },
    element: <Edit />,
    errorElement: <Error />
  },
  {
    path: "/callback",
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const code = url.searchParams.get("code");
      const response = await auth.githubCallback(code);
      return response.data;
    },
    element: <Response />,
    errorElement: <Error />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider 
    router={router} 
    fallbackElement={
      <div>
        <h2>Loading...</h2>
      </div>
    }
  />
);
