// module.exports = {
//   HOST: process.env.DB_HOST,
//   USER: process.env.DB_USER,
//   PASSWORD: process.env.DB_PASSWORD,
//   DB: process.env.DB_NAME,
// };

// config.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('nom_de_la_base_de_donnees', 'utilisateur', 'mot_de_passe', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
