
const express = require('express'); 
const knex = require('knex');
const bodyParser = require('body-parser');
const initEndpoints = require("./routes");
const knexfile = require('./db/knexfile.js'); 
const db = knex(knexfile.development);
const app = express();

app.use(bodyParser.json());
initEndpoints (app, db);
app.get("/", (req, res) => { res.send(200)
})

module.exports = app;