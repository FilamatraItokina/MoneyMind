const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) return res.status(401).json({ message: "Token manquant" });

  jwt.verify(token, secret, (err, decoded) => {
    if(err) return res.status(401).json({ message: "Erreur", err });

    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email
    };

    next();
  });
}

module.exports = authMiddleware;