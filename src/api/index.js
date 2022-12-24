// Import axios
import axios from "axios";


/**
 * Projects API
 */
const api = axios.create({
    baseURL: "/projects"
});

export const projects = { 
    getProjectsByUserId: async (userId) => await api.get(`/user/${userId}`),
    getProjects: async () => await api.get(`/`),
    getProject: async (id) => await api.get(`/${id}`), 
    addProject: async (project) => await api.post("/", {project}), 
    updateProject: async (updates, id) => await api.put(`/${id}`, {updates}), 
    deleteProject: async (id) => await api.delete(`/${id}`),
};


/**
 * Auth API
 */
const authApi = axios.create({
    baseURL: "/auth/github"
});

export const githubAuth = { 
    githubLogin: async () => authApi.get("/login"), 
    githubCallback: async (code) => authApi.get(`/callback?code=${code}`),
};


/**
 * Users API
 */
const usersApi = axios.create({
    baseURL: "/users"
});

export const users = {
    checkSession: async () => usersApi.get("/check-session"),
    logout: async () => usersApi.get("/logout"),
};


/**
 * Settings API
 */
const settingsApi = axios.create({
    baseURL: "/settings"
});

export const settings = {
    get: async () => settingsApi.get("/"),
    set: async (settings) => settingsApi.post("/", { settings }),
    update: async (updates, id) => settingsApi.put(`/${id}`, { updates }),
    remove: async (id) => settingsApi.delete(`/${id}`),
};
