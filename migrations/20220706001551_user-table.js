/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.timestamps(true, true);
    })
    .createTable("user_corp", (table) => {
      table.increments();
      table.string("company_register").notNullable();
      table.string("email").notNullable();
      table.string("company_name").notNullable();
      table.string("password").notNullable();
      table.string("address").notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user").dropTableIfExists("user_corp");
};
