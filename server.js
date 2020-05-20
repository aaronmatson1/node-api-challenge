const express = require('express');
const server = express();
const cors = require("cors");
const projects = require("./Projects/projects")
const actions = require("./Actions/actions")

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger); 

server.use("/actions", actions)
server.use('/projects', projects)

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

function logger(req, res, next) {
console.log(`${new Date().toISOString()} ${req.ip} ${req.method} ${req.url}`)
next();
}

module.exports = server;