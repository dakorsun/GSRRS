import http from 'http';
import express from "express";

import expressSetup from './setup/expressSetup';
import socketSetup from './setup/socketSetup';
import serverConfig from '../config/serverConfig';
import './setup/sensorStreamSetup';

const app = express();

const {GPIO_LIB} = process.env;

expressSetup(app);

const server = http.createServer(app);

socketSetup(server);

server.listen(serverConfig.PORT, () => console.log(`Server listening on port ${serverConfig.PORT}!`));
