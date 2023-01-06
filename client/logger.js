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
		const port = process.env.PORT;
		const env = process.env.ENV;
		const devAPI = process.env.DEVELOPMENT_API
		
		if (env === "development") {
			console.info(
				`[app] App running in development mode, listening on port ${port}`, 
				`\n[app] App url: http://localhost:${port}`,
				"\n[app] API url:", devAPI
			);
		} else {
			console.info("App started");
		}
	}
};
