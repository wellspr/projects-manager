const createUserObject = (user) => {
    
    const date = Date.now();

    return {
        createdAt: date,
        lastModified: null,
        githubId: user.id,
        githubLogin: user.login,
        gitHubUrl: user.url,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
        isAdmin: false,
    };
};

module.exports = { createUserObject };
