const express = require("express");
const path = require('path');
const cors = require('cors');

const serverConfig = require('../../config/serverConfig');


module.exports = app => {

    app.use(express.static("public"));
    app.use((req, res, next) => {
        console.log(req.method, req.url);
        next();
    });
    app.use(cors());


    if(serverConfig.NODE_ENV !== 'production') {

        app.get("/", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../../../client/dist/index.html"))
        });
    }
};