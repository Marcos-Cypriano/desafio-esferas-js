module.exports = {
  "development": {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    username: 'docker',
    password: 'esferas',
    database: 'esferasDB',
    define: {
      timestamps: true,
      underscored: true
    }
  },
  "production": {
    dialect: 'postgres',
    host: 'esferas_host',
    username: 'esferas_user',
    password: 'esferas_password',
    database: 'esferasDB',
    define: {
      timestamps: true,
      underscored: true
    }
  }
  };