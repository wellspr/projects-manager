const express = require("express");
const { checkSession, destroySession } = require("../databases/sessions");

const usersRouter = express.Router();

usersRouter.get("/check-session", async (req, res) => {
    if (req.session) {
        const response = await checkSession(req.cookies[process.env.COOKIE_NAME]);
        return res.json(response);
    }
    return res.send(null);
});

usersRouter.get("/logout", async (req, res) => {
    if (req.session) {
        const response = await destroySession(req.cookies[process.env.COOKIE_NAME]);
        return res.json(response);
    }
    return res.send(null);
});

module.exports = usersRouter;
