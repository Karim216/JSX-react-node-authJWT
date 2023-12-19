let blockedTokens = [];

exports.logout = (req, res) => {
    console.log(req.headers)
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        blockedTokens.push(token);
        res.json({ message: 'User logged out.' });
    } else {
        res.sendStatus(401);
    }
};

exports.isTokenBlocked = (token) => {
    return blockedTokens.includes(token);
}
