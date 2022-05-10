/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('phones', function(table) {
        table.string('id'),
        table.string('phone')
  
        table.string('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('phones');
