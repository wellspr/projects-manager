const express = require("express");
const projectsRouter = express.Router();
const { 
    getProjects, 
    getProject, 
    addProject, 
    updateProject, 
    deleteProject 
} = require("../databases/projects");

projectsRouter.get("/", async (req, res) => {
    try {
        const response = await getProjects();
        res.json(response.items); // array of project objects
    } catch (err) {
        res.json(err);
    }
});

projectsRouter.get("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const response = await getProject(req.params.id);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

projectsRouter.post("/", async (req, res) => {
    try {
        const response = await addProject(req.body.project);
        res.json(response); // created project object
    } catch (err) {
        res.json(err);
    }
});

projectsRouter.put("/:id", async (req, res) => {
    try {
        const response = await updateProject(req.body.updates, req.params.id);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

projectsRouter.delete("/:id", async (req, res) => {
    try {
        const response = await deleteProject(req.params.id);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

module.exports = projectsRouter;