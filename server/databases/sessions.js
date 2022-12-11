const { Deta } = require("deta");
const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("sessions_db");

const checkSession = async (key) => {
    return await db.get(key);
};

const createSession = async (user, remember) => {

    const expires = () => {
        if (remember) {
            return 3600 * 24 * 30;
        }
        else {
            return 3600;
        } 
    };

    return await db.put(user, null, { expireIn: expires() });
};

const destroySession = async (key) => {
    return await db.delete(key);
};

module.exports = { checkSession, createSession, destroySession };
