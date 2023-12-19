// seed-database.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db.config.js');
const User = require('../models/user.model.js');

// Définissez vos utilisateurs initiaux
const initialUsers = [
  {
    firstname: 'John',
    lastname: 'Doe',
    email: 'contact@karim-betkom.com',
    password: '$2b$10$t.ppyWyymYUScNYG7BARP.SuIUiHg7te7.K42Lc.bX/G8FvsNd8oW',
  },
  {
    firstname: 'Patrick',
    lastname: 'Jacque',
    email: 'patrick.patrickoe@example.com',
    password: '$2b$10$t.ppyWyymYUScNYG7BARP.SuIUiHg7te7.K42Lc.bX/G8FvsNd8oW',
  },
  {
    firstname: 'Mohammed',
    lastname: 'Amine',
    email: 'amine@example.com',
    password: '$2b$10$t.ppyWyymYUScNYG7BARP.SuIUiHg7te7.K42Lc.bX/G8FvsNd8oW',
  },
  {
    firstname: 'Gilles',
    lastname: 'Pengue',
    email: 'pengue.gilles@growkom.com',
    password: '$2b$10$t.ppyWyymYUScNYG7BARP.SuIUiHg7te7.K42Lc.bX/G8FvsNd8oW',
  },
  // Ajout d'autres utilisateurs selon vos besoins
];

// Synchronisez la base de données et ajoutez les utilisateurs initiaux
(async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(initialUsers);
    console.log('Base de données peuplée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  } finally {
    // Fermez la connexion à la base de données
    await sequelize.close();
  }
})();
