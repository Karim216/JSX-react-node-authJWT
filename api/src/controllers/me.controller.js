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

          // Utilisez await pour obtenir le résultat de getUserRight
          const right = await getUserRight(user.profile_id);

          res.json({
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              country: user.country,
              city: user.city,
              fushoraire: user.fushoraire,
              imgURL: user.imgURL,
              idProfile: user.profile_id,
              profileName: user.profileName,
              typeressource: user.typeressource,
              function: user.jobTitle,
              serviceTeam: user.serviceTeam,
              team: user.team,
              right: right,
              imgURL: user.imgURL,
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


// A revenir
// exports.getUserId = async (req, res) => {

//   const myToken = req.cookies['auth_token'];

//   console.log(myToken)

//   try {
//     let decodedData = jwt.decode(myToken);
//     if (!decodedData || !decodedData.email) {
//       return null;
//     }
//     let user = await Auth.findUserByEmail(decodedData.email);
//     if (!user) {
//       res.status(404).send("User not found");
//       return;
//     }

//     return user.id;

//   } catch (err) {
//     console.error(err);
//     return null;
//   }

// };


// Find a single Profile by Id
const getUserRight = (id) => {
  return new Promise((resolve, reject) => {
    Me.findRightById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          reject({ message: `Not found Profile with id ${id}.` });
        } else {
          reject({ message: "Error retrieving Profile with id " + id });
        }
      } else {
        resolve(data);
      }
    });
  });
};