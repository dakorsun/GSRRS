import http from 'http';
import express from "express";

import expressSetup from './setup/expressSetup';
import socketSetup from './setup/socketSetup';
import serverConfig from '../config/serverConfig';
import rpiGpioService from "./services/rpiGpioService.js";
import rpioService from "./services/rpioService.js";


let gpio;

const {GPIO_LIB} = process.env;

switch(GPIO_LIB){
    case 'rpio':
        gpio = rpioService.gpio;
        break;
    default:
        gpio = rpiGpioService.gpio

}

const app = express();

expressSetup(app);

const server = http.createServer(app);

socketSetup(server);

server.listen(serverConfig.PORT, () => console.log(`Server listening on port ${serverConfig.PORT}!`));
