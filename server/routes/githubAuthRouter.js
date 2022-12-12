const express = require("express");

const { createUser, checkGithubId } = require("../databases/users");
const { createUserObject } = require("../users");
const { createSession } = require("../databases/sessions");
 
const githubAuthRouter = express.Router();

const { Github, githubAuth } = require("../auth/github");
const github = new Github();

githubAuthRouter.get("/login", (req, res) => {
    res.send(github.loginUrl());
});

githubAuthRouter.get("/callback", githubAuth, async (req, res) => {
    if (req.err) {
        console.log(req.err);
        return res.json(req.err);
    }
    /**
     * Check if user already exists in users database;
     */
    const { items, count } = await checkGithubId(req.user.id);
    /**
     * if NOT: 
     * 1) create new user AND 
     * 2) create a new session 
     * for this new user;
     */
    if (count === 0) {
        // Create a new user object
        const newUser = createUserObject(req.user);

        // Create a new user in the database
        const response = await createUser(newUser);

        // Create a new session in the database
        delete response["key"];
        const session = await createSession(response);

        // Send a cookie to the user's browser, along with the response.
        res.cookie(process.env.COOKIE_NAME, session.key);
        res.json(response);
    }
     /** 
     * if YES, create a new session for this user;
     */
    if (count === 1) {
        // Create Session
        console.log("HEADERS: ", req.headers);
        const data = items[0];
        delete data["key"];
        const session = await createSession(data);

        // Send a cookie to the user's browser, along with the response.
        res.cookie(process.env.COOKIE_NAME, session.key);
        res.json(data);
    }
});

module.exports = githubAuthRouter;