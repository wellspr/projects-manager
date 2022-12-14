const { default: axios } = require("axios");
const { Octokit } = require("octokit");

const clientId = process.env.GITHUB_CLIENT_ID;

class Github {

    constructor() {
        this.clientId = clientId
    }

    loginUrl(scope="") {
        let url = new URL(`https://github.com/login/oauth/authorize`);
        url.searchParams.set("client_id", this.clientId);
        url.searchParams.set("scope", scope);
        return url;
    }

    async getUser(access_token) {
        const octokit = new Octokit({ auth: access_token });
        const response = await octokit.request("GET /user", {});
        return response.data;
    }
}


const githubAuth = async function(req, res, next) {
    const github = new Github();
    const response = await getAccessToken(req, res);

    if (response.error) {
        req.err = response;
    } else {
        const user = await github.getUser(response.access_token);
        req.user = user;
        req.user.githubLogin = true;
    }

    next();
}

const getAccessToken = async function(req, res) {
    const response = await axios.post("https://github.com/login/oauth/access_token", {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code
    });
    return extract(response.data);
}

const extract = function(data) {
    const result = {};
    
    decodeURIComponent(data).split("&").forEach(item => {
        const arr = item.replace(/=/, " ").split(" ");
        result[arr[0]] = arr[1];
    });

    return result;
}

module.exports = { Github, githubAuth };
