const port = process.env.PORT;
const path = require("path");
const express = require("express");
const proxy = require("express-http-proxy");
const { apiBaseURL } = require("./config");
const logger = require("./logger");

const app = express();

/** Serve static files */
app.use("/static", express.static(path.join(__dirname, "public", "static")));

/** Serve Favicon */
app.use("/favicon", express.static(path.join(__dirname, "public", "favicon")));

app.use(logger.routes, (req, res, next) => {
	/** API requests are treated next  */
	if (req.url.includes("/api")) {
		return next();
	}

	/** App routes */
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

/** All api requests are proxied to the appropriate routes on server API 
 * */
app.use("/api", proxy(apiBaseURL));

app.listen(port, logger.appInfo);

module.exports = app;