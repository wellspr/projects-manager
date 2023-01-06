const { port, starter } = require("./config");
const { checkSession } = require("./databases/sessions");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3100"
    ]
}));

app.use("/", async (req, res, next) => {
    const cookieName = process.env.COOKIE_NAME;
    if (req.cookies && req.cookies[cookieName]) {
        const response = await checkSession(req.cookies[cookieName]);
        req.session = response;
    }
    next();
});

const routes = require("./routes");

app.use("/projects", routes.projectsRouter);
app.use("/auth/github", routes.githubAuthRouter);
app.use("/users", routes.usersRouter);
app.use("/settings", routes.settingsRouter);

app.listen(port, starter());

module.exports = app;
