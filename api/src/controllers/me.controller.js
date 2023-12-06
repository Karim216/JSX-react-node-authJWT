const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config.js");
const Auth = require("../models/auth.model.js");
const Me = require("../models/me.model.js");

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
          let user = await Auth.findUserByEmail(data.email);
          if (!user) {
            res.status(404).send("User not found");
            return;
          }

          res.json({
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              // You can include more user fields here
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