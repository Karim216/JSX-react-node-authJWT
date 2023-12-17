const Sequelize = require('sequelize');

const sequelize = new Sequelize("template", "karim", "test123", {
  host: "localhost",
  dialect: "mysql",
});

// const sequelizeEnv = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_TYPE,
// });

module.exports = sequelize;
