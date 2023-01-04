const express = require("express");
const { checkSession, destroySession } = require("../databases/sessions");

const usersRouter = express.Router();
const cookieName = process.env.COOKIE_NAME;

usersRouter.get("/check-session", async (req, res) => {
    if (req.session) {
        const response = await checkSession(req.cookies[cookieName]);
        return res.json(response);
    }
    return res.send(null);
});

usersRouter.get("/logout", async (req, res) => {
    if (req.session) {
        const response = await destroySession(req.cookies[cookieName]);
        res.clearCookie(cookieName);
        return res.json(response);
    }
    return res.send(null);
});

module.exports = usersRouter;
