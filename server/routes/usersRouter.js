const express = require("express");
const { checkSession, destroySession } = require("../databases/sessions");

const usersRouter = express.Router();

usersRouter.get("/check-session", async (req, res) => {
    if (req.cookies && req.cookies[process.env.PROJECTS_MANAGER]) {
        const response = await checkSession(req.cookies[process.env.PROJECTS_MANAGER]);
        res.json(response);
    }
});

usersRouter.get("/logout", async (req, res) => {
    if (req.cookies && req.cookies[process.env.PROJECTS_MANAGER]) {
        const response = await destroySession(req.cookies[process.env.PROJECTS_MANAGER]);
        res.json(response);
    }
});

module.exports = usersRouter;
