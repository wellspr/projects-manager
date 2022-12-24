const { Deta } = require("deta");
const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("settings_db");


const get = async (userId) => {
	return await db.fetch({ userId });
};

const set = async (data) => {
	return await db.put(data);
};

const update = async (updates, id) => {
	return await db.update(updates, id);
};

const remove = async (id) => {
	return await db.delete(id);
};

const settings = {
	get,
	set, 
	update,
	remove,
};

module.exports = settings;