const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/jwt.config.js");
const Auth = require("../models/auth.model.js");
const User = require("../models/user.model.js");
const { sendEmailWithValidation } = require("./sendmail.controller.js");

exports.login = async (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;

  try {
    let user = await Auth.findUserByEmail(userEmail);

    if (!user) {
      return res.status(401).send("Email is incorrect");
    }

    let validPassword = await decryptPWD(userPassword, user.password);

    if (!validPassword) {
      return res.status(401).send("Password is incorrect");
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      config.secret,
      {
        expiresIn: "3h",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      config.secret,
      {
        expiresIn: "168h",
      }
    );

    res.json({
      message:
        'Authenticated! Use this accessToken in the "Authorization" header',
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

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

    User.updatePasswordById(
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
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).send("Refresh token is required");
  }

  try {
    // Vérifiez si le token de rafraîchissement est valide
    const decoded = jwt.verify(refreshToken, config.secret);

    // Générez un nouveau token d'accès
    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      config.secret,
      {
        expiresIn: "3h",
      }
    );

    res.json({
      message: "New access token generated",
      accessToken: accessToken,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("Refresh token has expired");
    }
    res.status(500).send("Internal server error");
  }
};

const decryptPWD = async (passwordToCheck, hashedPassword) => {
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
