import { getJSONfromRpository } from './cvmfs.js';
import express from 'express';
import dotenv from 'dotenv';
import * as handlers from './handlers.js';

// a = require('dotenv').config();
dotenv.config();

import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');

const app = express();
// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Controle");
    next();
});

const port = process.env.PORT;
app.listen(port, () => `Server running on port ${port}`);

app.get("/api/repos", handlers.repos);
app.get("/api/details/:repo", handlers.details);
app.get("/api/stat/:repo", handlers.stat);
app.get("/api/stat/:repo/:path([^?]+)", handlers.stat);
app.get("/api/fetch/:repo/:path([^?]+)", handlers.fetch);