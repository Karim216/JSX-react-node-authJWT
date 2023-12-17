// Contient toutes les methodes pour gérer les mots de passe
const { sendEmailWithValidation } = require("../controllers/sendmail.controller.js");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

exports.passwordReset = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let userEmail = req.body.email;

  try {
    let user = await Auth.findUserByEmail(userEmail);

    if (!user) {
      return res.status(401).send("Email is incorrect");
    }

    console.log(user.id);

    let newPassword = this.generateRandomPassword();
    let newPasswordHashed = await this.hashpassword(newPassword);

    User.updateById(
      user.id,
      newPasswordHashed,
      new User(user),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${user.id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + user.id,
            });
          }
        } else {
          if (
            sendEmailWithValidation(
              (mailTo = userEmail),
              (password = newPassword),
              (username = user.firstname),
              (subject = "Votre nouveau mot de passe - maestroGRC")
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
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.decryptPWD = async (passwordToCheck, hashedPassword) => {
  try {
    const result = await bcrypt.compare(passwordToCheck, hashedPassword);
    console.log(result ? "Mot de passe correct" : "Mot de passe incorrect");
    return result;
  } catch (err) {
    console.error("Erreur lors de la vérification du mot de passe : " + err);
    return false;
  }
};

exports.hashpassword = async (passwordToCheck) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(passwordToCheck, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });

    console.log("Mot de passe crypté : " + hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.error("Erreur lors du cryptage du mot de passe : " + err);
    throw err;
  }
};

exports.generateRandomPassword = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-.!$@*";
  let password = "";

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};