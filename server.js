const express = require('express');
const server = express();
const helmet = require("helmet");
const projects = require("./Projects/projects")
const actions = require("./Actions/actions")

server.use(express.json());
server.use(helmet());
server.use("/api/actions", actions)
server.use("/api/projects", projects)


server.get('/', (req, res) => {
    res.send(`<h2>Hey Dude!</h2>`)
})

function errorHandler(error, req, res, next) {
    console.log('ajm server.js line 21 error: ', error.message);
    res.status(400).json({ message: error.message });
}

server.use(errorHandler);

module.exports = server; 