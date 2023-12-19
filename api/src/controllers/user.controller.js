const User = require("../models/user.model.js");
const { sendEmailWithValidation } = require("./sendmail.controller.js");
const password = require("../auth/password.js");
const jwt = require("jsonwebtoken");
const config = require("../auth/jwt.config.js");

// Opérations CRUD

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let passwordRandaom = password.generateRandomPassword();
  let passworHashed = await password.hashpassword(passwordRandaom);

  // Create a User
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: passworHashed,
  });

  // console.log(user.dataValues)

  try {
    const newUser = await User.createOne(user.dataValues);

    const emailSent = await sendEmailWithValidation(
      req.body.email,
      passwordRandaom,
      req.body.firstname
    );

    if (emailSent) {
      console.log("New User email", newUser.email);
    } else {
      console.error("Erreur lors de l'envoi de l'email pour", newUser.email);
    }

    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Erreur lors de la création de l'utilisateur: " + error.message,
      });
  }
};

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error.kind === "not_found") {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    } else {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
  }
};

// Obtenir tous les utilisateurs avec ou sans filtre par e-mail
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAllUsers(req.query.email);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};

// Mettre à jour un utilisateur par son ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.updateById(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.kind === "not_found") {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    } else {
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
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
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};

exports.getUserInfo = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, config.secret, async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        try {
          let user = await User.findUserByEmail(data.email);
          if (!user) {
            res.status(404).send("User not found");
            return;
          }

          res.json({
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
          });
        } catch (err) {
          console.error(err);
          res.status(500).send("Internal server error");
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
};
