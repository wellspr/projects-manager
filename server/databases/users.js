const { Deta } = require("deta");
const deta = Deta(process.env.PROJECT_KEY)
const db = deta.Base("users_db");

const getUser = async (userId) => {
    return await db.get(userId)
};

const checkUserEmail = async (email) => {
    return await db.fetch({ email });
};

const checkGithubId = async (githubId) => {
    return await db.fetch({ githubId });
};

const createUser = async (user) => {
    return await db.put(user);
};

const updateUser = async (userId, updates) => {
    return await db.update(updates, userId);
}

const deleteUser = async (userId) => {
    return db.delete(userId);
};

module.exports = {
    checkGithubId,
    checkUserEmail,
    createUser,
    updateUser,
    deleteUser,
    getUser,
};
