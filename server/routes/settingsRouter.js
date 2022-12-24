const express = require("express");
const settingsRouter = express.Router();
const settings = require("../databases/settings");

settingsRouter.use("/", async (req, res, next) => {
	if (req.session) {
		return next();
	}
	return res.json({ unauthorized: true });
});


settingsRouter.get("/", async (req, res) => {
	
	console.log("settings.get", req.session.userId);
	try {
		const response = await settings.get(req.session.userId);
		console.log(response)
		res.json(response.items[0]);
	} catch (err) {
		res.json(err);
	}
});

settingsRouter.post("/", async (req, res) => {

	console.log("settings.post", req.body);
	try {
		const response = await settings.set(req.body.settings);
		res.json(response);
	} catch (err) {
		res.json(err);
	}
});

settingsRouter.put("/:id", async (req, res) => {
	try {
		const response = await settings.update(req.body.updates, req.params.id);
		res.json(response);
	} catch (err) {
		res.json(err);
	}
});

settingsRouter.delete("/:id", async (req, res) => {
	try {
		const response = await settings.remove(req.params.id);
		res.json(response);
	} catch (err) {
		res.json(err);
	}
});

module.exports = settingsRouter;