const port = process.env.PORT;
const origin = process.env.ORIGIN;

const starter = () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Receives requests from origin ${origin}`);
};

module.exports = {port, origin, starter};
