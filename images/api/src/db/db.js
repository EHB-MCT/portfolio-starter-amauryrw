const knex = require("knex")({
  client: "pg",
  connection: {
    host: "store", 
    database: "DEV_V",
  },
});

module.exports = knex;