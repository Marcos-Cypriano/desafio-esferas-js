/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('emails', function(table) {
        table.string('id'),
        table.string('email')

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
exports.down = knex => knex.schema.dropTable('emails');
