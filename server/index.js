const { port, starter } = require("./config");

const express = require("express");
const projects = require("./db");
const app = express();
app.use(express.json());

app.get("/projects", async (req, res) => {
    try {
        const response = await projects.getProjects();
        res.json(response.items); // array of project objects
    } catch (err) {
        res.json(err);
    }
});

app.get("/projects/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const response = await projects.getProject(req.params.id);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

app.post("/projects", async (req, res) => {
    try {
        const response = await projects.addProject(req.body.project);
        res.json(response); // created project object
    } catch (err) {
        res.json(err);
    }
});

app.put("/projects/:id", async (req, res) => {
    try {
        const response = await projects.updateProject(req.body.updates, req.params.id);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

app.delete("/projects/:id", async (req, res) => {
    try {
        const response = await projects.deleteProject(req.params.id);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

app.listen(port, starter());

module.exports = app;
