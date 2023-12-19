// sync-db.js
const sequelize = require('./db.config.js');
const User = require('../models/user.model.js');

sequelize.sync({ force: true }).then(() => {
  console.log('Base de données synchronisée');
  // Vous pouvez commencer à utiliser les modèles ici
});
