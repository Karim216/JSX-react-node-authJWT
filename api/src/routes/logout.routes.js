module.exports = (userapp) => {
    const express = require('express');
    const router = express.Router();
    const logoutController = require('../controllers/logout.controller.js');
    
    router.post('/', logoutController.logout);
  
    userapp.use("/api/logout", router);
  }  