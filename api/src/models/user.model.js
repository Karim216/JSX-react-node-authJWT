const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'user',
});

// Opérateur Sequelize pour les requêtes complexes
const { Op } = require('sequelize');

// Opérations CRUD

// Créer un nouvel utilisateur
User.createOne = async (newUser) => {
  try {
    const createdUser = await User.create(newUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

// Obtenir un utilisateur par son ID
User.findById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      return user;
    }
    throw { kind: 'not_found' };
  } catch (error) {
    throw error;
  }
};

// Obtenir tous les utilisateurs avec ou sans filtre par e-mail
User.findAllUsers = async (email = null) => {
  try {
    let options = {
      order: [['created_at', 'DESC']],
    };

    if (email) {
      options.where = {
        email: { [Op.like]: `%${email}%` },
      };
    }

    const users = await User.findAll(options);
    return users;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un utilisateur par son ID
User.updateById = async (id, updatedUser) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(updatedUser);
      return user;
    }
    throw { kind: 'not_found' };
  } catch (error) {
    throw error;
  }
};

// Supprimer un utilisateur par son ID
User.deleteById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true; // La suppression a réussi
    }
    throw { kind: 'not_found' };
  } catch (error) {
    throw error;
  }
};

module.exports = User;
