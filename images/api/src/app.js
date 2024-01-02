
const express = require('express'); 
const knex = require('knex');
const bodyParser = require('body-parser');
const initEndpoints = require("./routes");

// require and manage database connection
const knexfile = require('./db/knexfile.js'); // Import your Knex configura const db
const db = knex(knexfile.development);

// initialise app and routes; const app = express();
const app = express();
app.use(bodyParser.json());
initEndpoints (app, db);
app.get("/", (req, res) => { res.send(200)
})
//export app

module.exports = app;