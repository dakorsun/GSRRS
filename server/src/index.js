import http from 'http';
import express from "express";

import expressSetup from './setup/expressSetup';
import socketSetup from './setup/socketSetup';
import serverConfig from '../config/serverConfig';


const app = express();

expressSetup(app);

const server = http.createServer(app);

socketSetup(server);

server.listen(serverConfig.PORT, () => console.log(`Server listening on port ${serverConfig.PORT}!`));