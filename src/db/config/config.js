const { config } = require('../../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

module.exports = {
  development: {
    URI: config.dbUrl,
    username: `${USER}`,
    password: `${PASSWORD}`,
    database: config.dbName,
    dialect: 'postgres'
  },
  production: {
    URI: config.dbUrl,
    username: `${USER}`,
    pgpassword: `${PASSWORD}`,
    database: config.dbName,
    dialect: 'postgres',
    dialectOptions:{
      ssl: {
        rejectUnauthorized: false,
      }
    }
  }
}
