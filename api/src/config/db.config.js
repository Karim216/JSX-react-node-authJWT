// config.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('template', 'karim', 'test123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
