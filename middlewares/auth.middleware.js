const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret secret****';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    res.status(401).json({ message: "Token manquant"});
  }

  jwt.verify(token, secret, (err, decoded) => {
    if(err) return res.status(401).json({ message: "Non autorisé", err});
    req.user = decoded;


    next();
  })
}

module.exports = authMiddleware;