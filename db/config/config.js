const { config } = require('../../config/config.js');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    URI: URI,
    username: `${USER}`,
    password: `${PASSWORD}`,
    database: config.dbName,
    dialect: 'postgres'
  },
  production: {
    URI: URI,
    username: `${USER}`,
    password: `${PASSWORD}`,
    database: config.dbName,
    dialect: 'postgres'
  }
}
