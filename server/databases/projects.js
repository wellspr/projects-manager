const { Deta } = require("deta");
const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("projects_db");

const getProjects = async (userId) => {
    return await db.fetch({ userId });
};

const getProject = async (id) => {
    return await db.get(id);
};

const addProject = async (project) => {
    return await db.put(project);
};

const updateProject = async (updates, id) => {
    return await db.update(updates, id);
};

const deleteProject = async (id) => {
    return await db.delete(id);
};

const projects = { 
    getProjects, 
    getProject, 
    addProject, 
    updateProject, 
    deleteProject 
};

module.exports = projects;