/**
 * @param {import ("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("api", function (table) {
    table.increments("id").primary(); // Using UUID as the primary key
    table.uuid("UUID");
    table.string("name");
    table.integer("age");
    table.string("classgroup"); // Class group information
    table.double("grade"); // Student's grade information
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

/**
 * @param { import ("knex").Knex} knex
 * @returns {Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
