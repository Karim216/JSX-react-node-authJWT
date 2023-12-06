const User = require('../models/user.model.js');

// Opérations CRUD

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.createOne(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
};

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error.kind === 'not_found') {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  }
};

// Obtenir tous les utilisateurs avec ou sans filtre par e-mail
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAllUsers(req.query.email);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// Mettre à jour un utilisateur par son ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.updateById(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.kind === 'not_found') {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    } else {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
  }
};

// Supprimer un utilisateur par son ID
exports.deleteUserById = async (req, res) => {
  try {
    const success = await User.deleteById(req.params.id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};