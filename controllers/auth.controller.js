require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');


exports.Register = async (req, res) => {
  const {username, email, password} = req.body;
  if(!username || !email || !password) return res.status(400).json({ message: "Info required" });

  const hashed = await bcrypt.hash(password, 10);
  User.Create(username, email, hashed, function(err, result){
    if(err){
      if(err.message.includes('UNIQUE')){
        return res.status(409).json({ message: "Email already used" });
      }
      return res.status(500).json({ error: err.message });
    }

    const userId = result.id;

    const token = jwt.sign(
      {id: userId, email, username},
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    );

    req.res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({ message: "User created", result, token });
  });
}


exports.Login = (req, res) => {
const {email, password} = req.body;
if (!username || !email)
  return res.status(400).json({ message: "Info required" });

  User.FindByEmail(email, async function(err, user){
    if(err) return res.status(500).json({ error: err.message });
    if(!user) return res.status(404).json({ message: "No user found" });

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      {id: user.id, email: user.email, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    );

    req.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({ message: "You are connected", token });
  });
}