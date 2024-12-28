const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Get token from Authorization header
  if (!token) return res.sendStatus(403);  // Forbidden if no token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);  // Forbidden if token is invalid
    req.user = user;
    next();  // Move to the next middleware or route handler
  });
};

module.exports = authenticateJWT;