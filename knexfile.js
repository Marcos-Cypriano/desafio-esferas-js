// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: "localhost",
      port: 5432,
      database: 'esferasDB',
      user:     'docker',
      password: 'esferas'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: "localhost",
      port: 5432,
      database: 'esferasDB',
      user:     'docker',
      password: 'esferas'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: "localhost",
      port: 5432,
      database: 'my_DB',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    }
  }

};
