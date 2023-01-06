let apiBaseURL;

/** Production */
if (process.env.DETA_RUNTIME) {
	apiBaseURL = process.env.PRODUCTION_API;
}

/** Development */
if (process.env.ENV === "development") {
	apiBaseURL = process.env.DEVELOPMENT_API;
}

module.exports = { apiBaseURL };