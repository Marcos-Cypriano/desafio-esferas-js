const kenx = require("kenx")
const configuration = require("../../knexfile")

// Using development configuration
const connection = knex(configuration.development)

module.exports = connection