/**
 * Function to initialise all endpoints in subsequent files
 * @param app: the express app to attach the endpoints to
 * @param db: knex element containing the database connection
 */

function initEndpoints(app, db) {
  require("./students")(app, db);
}

module.exports = initEndpoints;
