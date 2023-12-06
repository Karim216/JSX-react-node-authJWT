module.exports = (userapp) => {
    const express = require("express");
    const router = express.Router();
    const authController = require("../controllers/auth.controller.js");
  
    router.post("/login", authController.login);
    router.post("/refresh-token", authController.refreshToken);
    router.post("/password-reset", authController.passwordReset);
  
    userapp.use("/api", router);
  };
  