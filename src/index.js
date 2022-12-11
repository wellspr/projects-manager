// Sass - scss
import "./sass/main.scss"

// Loading css
import "@loadingio/loading.css/loading.css";

// React & ReactDOM
import React from "react"
import ReactDOM from "react-dom/client"

// React Router
import {
    createBrowserRouter,
    createRoutesFromElements,
    redirect,
    Route,
    RouterProvider
} from "react-router-dom"

// Pages
import Home from "./Pages/Home"
import Create from "./Pages/Create"
import Edit from "./Pages/Edit"
import Response from "./Pages/Response"
import Error from "./Pages/Error"

// API
import { githubAuth, projects, users } from "./api";
import RequireAuth from "./hocs/RequireAuth";

// Component
import Loading from "./components/Loading";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<RequireAuth />}
            loader={async () => {
                const response = await users.checkSession();
                return response.data;
            }}
            errorElement={<Error />}
            >
            <Route
                path="/"
                element={<Home />}
                loader={async () => {
                    const response = await projects.getProjects();
                    return response.data;
                }}
                errorElement={<Error />}
            />
            <Route
                path="/create"
                element={<Create />}
                errorElement={<Error />}
            />
            <Route
                path="/edit/:id"
                element={<Edit />}
                loader={async ({ params }) => {
                    const response = await projects.getProject(params.id);
                    return response.data;
                }}
                errorElement={<Error />}
            />
            <Route
                path="/callback"
                element={<Response />}
                loader={async ({ request }) => {
                    const url = new URL(request.url);
                    const code = url.searchParams.get("code");
                    const response = await githubAuth.githubCallback(code);
                    if (!response.data.error) {
                        return redirect("/");
                    }
                    return response.data;
                }}
                errorElement={<Error />}
            />
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <RouterProvider
        router={router}
        fallbackElement={<Loading />}
    />
)
