const User = require("../models/user.model.js");
const {
  hashpassword,
  decryptPWD,
  generateRandomPassword,
} = require("./auth.controller.js");
const {
  sendEmailWithValidation,
  sendEmailOnUpdatePassword,
} = require("./sendmail.controller.js");
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let password = generateRandomPassword();
  let passworHashed = await hashpassword(password);

  // Create a User
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    created_at: new Date(),
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else {
      if (
        sendEmailWithValidation(
          (mailTo = req.body.email),
          (password = password),
          (username = req.body.firstname)
        )
      ) {
        res.send(data);
        console.log("New User email", data.email);
      } else {
        res.status(500).send({
          message: "Erreur lors de l'envoie d'email, merci de le vérifier",
        });
      }
    }
  });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const email = req.query.email;
  console.log(req)

  User.getAll(email, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    else res.send(data);
  });
};

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  User.updateById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.updatePassword = async (req, res) => {
  // Validate Request

  console.log(req.body);

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let passworHashed = await hashpassword(req.body.password);

  User.updatePasswordById(
    req.params.id,
    passworHashed,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id,
          });
        }
      } else {
        if (
          sendEmailOnUpdatePassword(
            (mailTo = req.body.email),
            (username = req.body.firstname)
          )
        ) {
          res.send(data);
          console.log("New User email", data.email);
        } else {
          res.status(500).send({
            message: "Erreur lors de l'envoie d'email, merci de le vérifier",
          });
        }
      }
    }
  );
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
