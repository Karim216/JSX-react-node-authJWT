const jwt = require('jsonwebtoken');
const jwtConfig = require('../auth/jwt.config.js');
const logout = require('../auth/logout.js');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        if (logout.isTokenBlocked(bearerToken)) {
            res.sendStatus(401); // Unauthorized
        } else {
            req.accessToken = bearerToken;
            jwt.verify(req.accessToken, jwtConfig.secret, (err, data) => {
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
