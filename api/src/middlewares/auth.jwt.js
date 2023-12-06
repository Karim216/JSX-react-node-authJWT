const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config.js');
const logoutController = require('../controllers/logout.controller.js');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        if (logoutController.isTokenBlocked(bearerToken)) {
            res.sendStatus(401); // Unauthorized
        } else {
            req.accessToken = bearerToken;
            jwt.verify(req.accessToken, config.secret, (err, data) => {
                if (err) {
                    res.sendStatus(403); // Forbidden
                } else {
                    req.userData = data; // passer les données utilisateur aux routes suivantes
                    next();
                }
            });
        }
    } else {
        res.sendStatus(403); // Forbidden
    }
}

module.exports = verifyToken;
