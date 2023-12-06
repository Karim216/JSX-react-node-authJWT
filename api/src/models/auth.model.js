const sql = require("./db.js");
const bcrypt = require('bcrypt');

exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    sql.query('SELECT adminuser.*, adminprofil.profileName FROM adminuser JOIN adminprofil ON adminuser.profile_id = adminprofil.id WHERE adminuser.email = ?', [email], async function(error, results, fields) {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
};

exports.comparePassword = async (userPassword, hashedPassword) => {
  return userPassword === hashedPassword
};