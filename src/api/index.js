import axios from "axios";

const api = axios.create({
    baseURL: "/projects"
});

const getProjects = async () => await api.get("/");
const getProject = async (id) => await api.get(`/${id}`);
const addProject = async (project) => await api.post("/", {project});
const updateProject = async (updates, id) => await api.put(`/${id}`, {updates});
const deleteProject = async (id) => await api.delete(`/${id}`);

export const projects = { getProjects, getProject, addProject, updateProject, deleteProject };


const authApi = axios.create({
    baseURL: "/auth/github"
});

const githubLogin = async () => authApi.get("/login");
const githubCallback = async (code) => authApi.get(`/callback?code=${code}`);

export const githubAuth = { githubLogin, githubCallback };


const usersApi = axios.create({
    baseURL: "/users"
});

const checkSession = async () => usersApi.get("/check-session");
const logout = async () => usersApi.get("/logout");

export const users = { checkSession, logout };
