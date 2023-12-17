const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.config.js');
const { Op } = require('sequelize');

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  password: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
}, {
  tableName: 'user',
});

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

User.findUserByEmail = async (email) => {
  try {
    // Utilisez findOne pour trouver un utilisateur par son email.
    const user = await User.findOne({ where: { email: email } });
    if(user){
      return user; // user sera null si aucun utilisateur n'est trouvé
    }
    throw { kind: 'not_found' };
  } catch (error) {
    // Gestion des erreurs
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
