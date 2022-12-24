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
import Auth from "./Pages/Auth";
import Settings from "./Pages/Settings";

// API
import { githubAuth, projects, settings, users } from "./api";
import RequireAuth from "./hocs/RequireAuth";

// Component
import Loading from "./components/Loading";

// Layout
import Page from "./Layout/Page";
import Themes from "./hocs/Themes";

// Local Data Storage
import { clearData, getData, setData } from "./local/sessionStorage";


const errorBoundary = (error) => {
    if (error.response.status === 500) {
        throw new Response("api_is_down", { status: 500, statusText: "API Unavailable" });
    }

    throw new Response(error.response.data || "default", { 
        status: error.response.status, 
        statusText: error.response.statusText 
    });
};

const requireAuthLoader = async () => {
    const storedSession = getData("session");
    if (!storedSession) {
        try { 
            const response = await users.checkSession();
            const usersResponse = response.data;

            if (usersResponse) {
                setData({ key: "session", value: usersResponse });
            }
            return usersResponse;
        } catch (err) {
            errorBoundary(err);
        }
    } else {
        return storedSession;
    }
};

const settingsLoader = async () => {
    const storedSettings = getData("settings");
    if (!storedSettings) {
        try {
            const response = await settings.get();
            const serverSettings = response.data;

            if (!serverSettings.unauthorized) {
                setData({ key: "settings", value: serverSettings });
            }

            return serverSettings;
        } catch (err) {
            errorBoundary(err);
        }
    } else {
        return storedSettings;
    }
};

const projectsLoader = async () => {
    try {
        const response = await projects.getProjects();
        return response.data;
    } catch (err) {
        if (err.response.status === 401) {
            clearData();
            return redirect("/login");
        }
        errorBoundary(err);
    }
};

const editProjectLoader = async ({ params }) => {
    try {
        const response = await projects.getProject(params.id);
        if (!response.data) {
            throw new Response("", { 
                status: 404, 
                statusText: "Project Not Found",
            });
        }
        return response.data;
    } catch (err) {
        if (err.status === 404) {
            err.response = err;
            err.response.data = "project_not_found";
        }
        if (err.response.status === 401) {
            clearData();
            return redirect("/login");
        }

        errorBoundary(err);
    }
};

const loginResponseLoader = async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const response = await githubAuth.githubCallback(code);
    if (!response.data.error) {
        return redirect("/");
    }
    return response.data;
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<RequireAuth />}
            errorElement={<Error />}
            loader={requireAuthLoader}
            >

            {/* Themes */}
            <Route
                element={<Themes />}
                errorElement={<Error />}
                loader={settingsLoader}
                >

                {/* Login route */}
                <Route 
                    path="/login"
                    element={<Auth />}
                    errorElement={<Error />}
                />
            
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
                    <Route path="projects">
                        <Route
                            path=""
                            element={<Projects />}
                            errorElement={<Error />}
                            loader={projectsLoader}
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
                            loader={editProjectLoader}
                        />
                    </Route>
                    
                    {/* Settings */}
                    <Route 
                        path="settings"
                        element={<Settings />}
                    />


                </Route>
                    
                {/* Callback Route */}
                <Route
                    path="/callback"
                    element={<LoginResponse />}
                    errorElement={<Error />}
                    loader={loginResponseLoader}
                />
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

