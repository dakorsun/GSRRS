import express from "express";
import path from 'path';
import cors from 'cors';

const serverConfig = require('../../config/serverConfig');


export default app => {

    app.use(express.static("public"));
    app.use(cors());
    app.use((req, res, next) => {
        console.log(req.method, req.url);
        next();
    });

    if (serverConfig.NODE_ENV === 'production') {

        app.get("/", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../../../client/dist/index.html"))
        });
    }
};