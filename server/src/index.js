const express = require("express");
const expressSetup = require('./setup/expressSetup');
const serverConfig = require('../config/serverConfig');


const app = express();

// static assets
expressSetup(app);

// app start up
app.listen(serverConfig.PORT, () => console.log(`App listening on port ${serverConfig.PORT}!`));