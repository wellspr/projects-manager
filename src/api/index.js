import axios from "axios";

const api = axios.create({
    baseURL: "/"
});

const getProjects = async () => await api.get("/projects");
const getProject = async (id) => await api.get(`/projects/${id}`);
const addProject = async (project) => await api.post("/projects", {project});
const updateProject = async (updates, id) => await api.put(`/projects/${id}`, {updates});
const deleteProject = async (id) => await api.delete(`/projects/${id}`);


const authApi = axios.create({
    baseURL: "/auth"
});

const githubLogin = async () => authApi.get("/login");
const githubCallback = async (code) => authApi.get(`/callback?code=${code}`);

export const projects = { getProjects, getProject, addProject, updateProject, deleteProject };
export const auth = { githubLogin, githubCallback };