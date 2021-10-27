const express = require("express"),
    app = express();
const {Client} = require("pg");

// Const http = require('http')
const dotenv = require("dotenv");
dotenv.config();

/*
 * Const cors = require('cors')
 * const mysql = require('mysql')
 * const router = express.Router()
 * const controller = require('./src/controller/file.controller')
 * const { request, response } = require('express')
 */
const port = 3001;

/* Different sets of existing APIs */
const grade = require("./routes/back-grade.js");
const members = require("./routes/back-members.js");
const privatedata = require("./routes/back-privatedata.js");
const cameras = require("./routes/back-cameras.js"),

    /*
     * Const client = new Client({
     * host: process.env.DATABASE_HOST,
     * port: process.env.DATABASE_PORT,
     * user: process.env.DATABASE_USERNAME,
     * password: process.env.DATABASE_PASSWORD,
     * database: process.env.DATABASE
     * })
     */

    client = new Client({
        "host": "localhost",
        "port": 5432,
        "user": "postgres",
        "password": "123",
        "database": "ProjetIntegration"
    });

app.listen(
    port,
    () => {

        console.log(`App running on port ${port}.`);

    }
);

app.use(express.json());
app.use((req, res, next) => {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers"
    );
    res.setHeader(
        "Access-Control-Allow-Credentials",
        "true"
    );
    next();

});

client.connect((err) => {

    if (err) {

        console.error(
            "connection error",
            err.stack
        );

    } else {

        console.log("connected");

    }

});

// ROUTE FOR API
grade(
    app,
    client
);
cameras(
    app,
    client
);
members(
    app,
    client
);
privatedata(
    app,
    client
);
