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
    RouterProvider,
} from "react-router-dom"

// Pages
import Home from "./Pages/Home"
import Projects from "./Pages/Projects";
import CreateProject from "./Pages/CreateProject";
import EditProject from "./Pages/EditProject";
import LoginResponse from "./Pages/Response"
import Error from "./Pages/Error"

// API
import { githubAuth, projects, users } from "./api";
import RequireAuth from "./hocs/RequireAuth";

// Component
import Loading from "./components/Loading";

// Layout
import Page from "./Layout/Page";
import Settings from "./Pages/Settings";
import Themes from "./hocs/Themes";


const errorBoundary = (error) => {
    if (error.response.status === 500) {
        throw new Response("api_is_down", { status: 500, statusText: "API Unavailable" });
    }
    throw new Response("", { status: error.response.status, statusText: error.response.statusText });
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<RequireAuth />}
            errorElement={<Error />}
            loader={async () => {
                try {
                    const usersResponse = await users.checkSession();
                    return usersResponse.data;
                } catch (err) {
                    errorBoundary(err);
                }
            }}
            >

            {/* Themes */}
            <Route
                element={<Themes />}
                errorElement={<Error />}
                >
            
                {/* Root Route */}
                <Route
                    path="/"
                    element={<Page />}
                    errorElement={<Error />}
                    >
                    <Route
                        path=""
                        element={<Home />}
                        errorElement={<Error />}
                    />

                    {/* Projects Route */}
                    <Route
                        path="projects"
                        errorElement={<Error />}
                        >

                        <Route
                            path=""
                            element={<Projects />}
                            errorElement={<Error />}
                            loader={async () => {
                                try {
                                    const response = await projects.getProjects();
                                    return response.data;
                                } catch (err) {
                                    errorBoundary(err);
                                }
                            }}
                        />
                    
                        <Route
                            path="create"
                            element={<CreateProject />}
                            errorElement={<Error />}
                        />
                    
                        <Route
                            path="edit/:id"
                            element={<EditProject />}
                            errorElement={<Error />}
                            loader={async ({ params }) => {
                                const response = await projects.getProject(params.id);
                                if (!response.data) {
                                    throw new Response("project", { status: 404, statusText: "Not Found" });
                                }
                                return response.data;
                            }}
                        />
                    </Route>
                    
                    {/* Settings */}
                    <Route 
                        path="settings"
                        element={<Settings />}
                    />

                    {/* Callback Route */}
                    <Route
                        path="callback"
                        element={<LoginResponse />}
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
            </Route>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider
        router={router}
        fallbackElement={<Loading />}
    />
);

