module.exports = (userapp) => {
    const express = require('express');
    const router = express.Router();
    const meController = require('../controllers/me.controller.js');
    const verifyToken = require('../middlewares/auth.jwt');
    
    router.use(verifyToken);
    router.get('/', meController.getUserInfo);
  
    userapp.use("/api/me", router);
  }  