const express = require("express");

const { createUser, checkGithubId, updateUser } = require("../databases/users");
const { createUserObject } = require("../users");
const { createSession } = require("../databases/sessions");
 
const githubAuthRouter = express.Router();

const { Github, githubAuth } = require("../auth/github");
const github = new Github();

githubAuthRouter.get("/login", (req, res) => {
    /** TODO: scope can be passed to loginUrl, and must be received somehow (via query ?) */
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
        response["userId"] = response.key
        delete response["key"];
        const session = await createSession({ user: response, remember: true});

        // Send a cookie to the user's browser, along with the response.
        res.cookie(process.env.COOKIE_NAME, session.key);
        res.json(response);
    }
     /** 
     * if YES, create a new session for this user;
     */
    if (count === 1) {
        // Update Saved User Data
        const userId = items[0].key;
        const updatedUser = createUserObject(req.user);
        const response = await updateUser(userId, updatedUser); /** If success returns null, else throws error */
        
        let data;

        if (!response) { /** If success... */
            // Recover data
            const user = await checkGithubId(req.user.id);
            data = user.items[0];
        } else { /** If not updated, use previous/outdated result */
            data = items[0];
        }
        
        // Create Session
        data["userId"] = data.key;
        delete data["key"];
        const session = await createSession({user: data, remember: true});

        // Send a cookie to the user's browser, along with the response.
        res.cookie(process.env.COOKIE_NAME, session.key, {
            sameSite: "lax"
        });
        res.json(data);
    }
});

module.exports = githubAuthRouter;