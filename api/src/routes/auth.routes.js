module.exports = (userapp) => {
  const express = require("express");
  const router = express.Router();
  const userLogin = require("../auth/login.js");
  const userLogout = require("../auth/logout.js");
  const password = require("../auth/password.js");

  // Login
  router.post("/login", userLogin.login);
  router.post("/refresh-token", userLogin.refreshToken);

  // Password
  router.post("/password-reset", password.passwordReset);

  // Logout
  router.post("/logout", userLogout.logout);

  userapp.use("/api", router);
};
