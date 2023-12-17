const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const config = require("./jwt.config.js");
const User = require("../models/user.model.js");
const password = require("./password.js")

exports.login = async (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;

  try {
    let user = await User.findUserByEmail(userEmail);

    if (!user) {
      return res.status(401).send("Email is incorrect");
    }

    console.log(user.email)

    let validPassword = await password.decryptPWD(userPassword, user.password);

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

/**
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
