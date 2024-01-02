/**
 * @param { import ("knex").Knex} knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema
    .createTable("classes", function (table) {
      table.increments("id").primary();
      table.string("class").unique();
      table.float("average_grade");
      table.string("classroom");
      table.uuid("uuid");
    })

    .table("students", function (table) {
      table
        .foreign("classgroup")
        .references("class")
        .inTable("classes")
        .onDelete("SET NULL");
    });
};

/** 
* @param {import ("knex").Knex } knex
* @returns {Promise<void>}

*/
exports.down = function (knex) {
  return knex.schema
    .table("students", function (table) {
      table.dropForeign("classgroup");
    })
    .dropTable("classes");
};
