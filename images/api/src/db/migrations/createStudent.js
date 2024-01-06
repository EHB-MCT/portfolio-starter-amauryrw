/**
 * @param {import ("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("api", function (table) {
    table.increments("id").primary(); 
    table.uuid("UUID");
    table.string("name");
    table.integer("age");
    table.string("classgroup"); 
    table.double("grade"); 
    table.timestamps(true, true); 
  });
};

/**
 * @param { import ("knex").Knex} knex
 * @returns {Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
