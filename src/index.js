// Sass - scss
import "./sass/main.scss";

// Loading css
import "@loadingio/loading.css/loading.css";

// React & ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// React Router
import {
    createBrowserRouter,
    createRoutesFromElements,
    redirect,
    Route,
    RouterProvider,
} from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Project from "./Pages/Project";
import CreateProject from "./Pages/CreateProject";
import EditProject from "./Pages/EditProject";
import LoginResponse from "./Pages/Response";
import Error from "./Pages/Error";
import Auth from "./Pages/Auth";
import Settings from "./Pages/Settings";

// API
import { githubAuth, projects, settings, users } from "./api";

// Hocs
import RequireAuth from "./hocs/RequireAuth";
import Themes from "./hocs/Themes";

// Components
import Loading from "./components/Loading";

// Layout
import Page from "./Layout/Page";

// Local Data Storage
import { local, temp } from "./local";


/** Error Boundary */
const errorBoundary = (error) => {
    if (error.response.status === 500) {
        throw new Response("api_is_down", { status: 500, statusText: "API Unavailable" });
    }

    throw new Response(error.response.data || "default", { 
        status: error.response.status, 
        statusText: error.response.statusText 
    });
};

/** Require Auth Loader */
const requireAuthLoader = async () => {

    const storedSession = local.session.getData();
    
    if (!storedSession) {
        try { 
            const response = await users.checkSession();
            const usersResponse = response.data;

            if (usersResponse) {
                local.session.setData(usersResponse);
            }
            return usersResponse;
        } catch (err) {
            errorBoundary(err);
        }
    } else {
        return storedSession;
    }
};

/** Settings Loader */
const settingsLoader = async () => {
    const storedSettings = local.settings.getData();

    if (!storedSettings) {
        try {
            const response = await settings.get();
            const serverSettings = response.data;

            if (!serverSettings.unauthorized) {
                local.settings.setData(serverSettings);
            }

            return serverSettings;
        } catch (err) {
            errorBoundary(err);
        }
    } else {
        return storedSettings;
    }
};

/** Projects Loader */
const projectsLoader = async () => {
    const storedProjects = local.projects.get();

    if (!storedProjects) {
        try {
            const response = await projects.getProjects();
            const projectsResponse = response.data;
            if (projectsResponse) {
                console.log(projectsResponse);
                local.projects.set(projectsResponse);
            }
            return projectsResponse;
        } catch (err) {
            if (err.response.status === 401) {
                local.session.removeData();
                return redirect("/login");
            }
            errorBoundary(err);
        }
    } else {
        return storedProjects;
    }
};

/** Project Loader */
const projectLoader = async ({ params }) => {
    const storedProjects = local.projects.get();

    if (!storedProjects) {
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
                local.session.removeData();
                return redirect("/login");
            }

            errorBoundary(err);
        }
    } else {
        return local.projects.get(params.id);
    }
};

/** Create Project Loader */
const createProjectLoader = async () => {
    const savedProject = temp.getData("saved_project");

    if (savedProject) {
        return savedProject;
    }

    return null;
};

/** Edit Project Loader */
const editProjectLoader = async ({ params }) => {

    const storedProjects = local.projects.get();

    if (!storedProjects) {
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
                local.session.removeData();
                return redirect("/login");
            }

            errorBoundary(err);
        }
    } else {
        const localUpdate = temp.getData("update");

        if (localUpdate) {
            const project = localUpdate;
            temp.removeData("update");
            return { ...project, ...{ key: params.id }};
        }

        return local.projects.get(params.id);
    }
};

/** Login Response Loader */
const loginResponseLoader = async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const response = await githubAuth.githubCallback(code);
    if (!response.data.error) {
        const navigationState = temp.getData("navigationState");
        if (navigationState) {
            const redirectUrl = navigationState.nextUrl;
            temp.removeData("navigationState");
            return redirect(redirectUrl);
        } else {
            return redirect("/");
        }
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
                            path="project/:id"
                            element={<Project />}
                            errorElement={<Error />}
                            loader={projectLoader}
                        />
                    
                        <Route
                            path="create"
                            element={<CreateProject />}
                            errorElement={<Error />}
                            loader={createProjectLoader}
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

