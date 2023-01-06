/** A helper to log info */
module.exports = {

	routes: (req, res, next) => {
		console.info(
			`[app]`+ 
			` [${new Date(Date.now()).toLocaleString()}]`+
			` ${req.method}`+
			` ${req.url}`
		);
		next();
	},

	appInfo: () => {
		const port = process.env.PORT
		const env = process.env.ENV
		
		if (env === "development") {
			console.info(
				`App running in development mode, listening on port ${port}`, 
				`\nApp url: http://localhost:${port}`,
				"\nDevelopment API:", env
			);
		} else {
			console.info("App started");
		}
	}
};