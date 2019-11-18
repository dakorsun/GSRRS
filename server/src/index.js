const http = require('http');
const express = require("express");

const expressSetup = require('./setup/expressSetup');
const socketSetup = require('./setup/socketSetup');
const serverConfig = require('../config/serverConfig');


const app = express();

expressSetup(app);

const server = http.createServer(app);

socketSetup(server);

server.listen(serverConfig.PORT, () => console.log(`Server listening on port ${serverConfig.PORT}!`));